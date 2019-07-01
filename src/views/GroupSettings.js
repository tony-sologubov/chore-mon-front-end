import React from "react";
import "../../src/styles/settings.css";
import Modal from "react-modal";
import axios from "axios";
import { withRouter } from "react-router-dom";

const url = "https://chore-monkey.herokuapp.com/api";
class GroupSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      groups: [],
      groupName: "",
      groupId: 0,
      newName: ""
    };
  }

  openModalEdit = () => {
    this.setState({ showModalEdit: true });
  };
  openModal = () => {
    this.setState({ showModalDelete: true });
  };

  closeModal = () => {
    this.setState({ showModalDelete: false });
  };

  editGroup = () => {
    const groupId = window.location.href.split("/").pop();
    const newGroup = {
      name: this.state.newName
    };
    axios
      .put(`${url}/group/${groupId}`, newGroup)
      .then(response => {
        console.log(response.data);
        this.props.history.push(`/groups/${groupId}`);
      })
      .catch(err => {
        console.log("group not updating", err);
      });
  };

  deleteGroup = props => {
    const groupId = window.location.href.split("/").pop();
    console.log(groupId);
    axios.delete(`${url}/group/${groupId}`).then(group => {
      this.setState({ groups: [...this.state.groups, group.data.data] });
      this.props.history.push("/dashboard");
    });
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <div className="settingsContainer">
        <h1 className="settingsHeader"> Group Settings</h1>
        <h1>{this.state.groupName}</h1>

        <button className="updateEmailButton" onClick={this.openModalEdit}>
          Update Group
        </button>
        <button className="updateEmailButton" onClick={this.openModal}>
          Delete Group
        </button>

        <Modal
          isOpen={this.state.showModalEdit}
          // onRequestClose={this.closeModal}
          contentLabel="Update Email"
        >
          <div className="modal">
            <div className="modal-prompt">
              <h2>Update Group Name</h2>
            </div>
            <div className="modal-button-container">
              <input
                type="text"
                name="newName"
                placeholder={this.state.name}
                onChange={event => this.handleChange(event)}
                value={this.state.newName}
              />
            </div>
            <button
              className="settingsCloseButton"
              type="button"
              onClick={this.editGroup}
            >
              Submit
            </button>
          </div>
        </Modal>
        <Modal
          isOpen={this.state.showModalDelete}
          onRequestClose={this.closeModal}
          contentLabel="Delete"
        >
          <div className="modal">
            <div className="modal-prompt">
              <h2>Are You Sure You Want To Delete?</h2>
            </div>
            <div className="modal-button-container" />
            <button
              className="settingsCloseButton"
              type="button"
              onClick={this.deleteGroup}
              onSubmit={this.handleSubmit}
            >
              Yes
            </button>
            <button
              className="settingsCloseButton"
              type="button"
              onClick={this.closeModal}
            >
              No
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default withRouter(GroupSettings);
