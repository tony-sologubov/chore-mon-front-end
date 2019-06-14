import React from 'react';
import "../../src/styles/settings.css";
import Modal from 'react-modal'
class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  openModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };



  render() {
    return (
      <div className="settingsContainer">
      <h1 className='settingsHeader'>Settings</h1>
        <img className='settingsPhoto' src={JSON.parse(localStorage.getItem("user")).photoURL} />
        <h1 className='settingsName'>
          {" " +
            JSON.parse(localStorage.getItem("user")).displayName.match(
              /^[a-z ,.'-]+$/i
            )[0]}
        </h1>
        <p className='settingsEmail'>
        {JSON.parse(localStorage.getItem("user")).email}
        </p>
        <button className="updateEmailButton" onClick={this.openModal}>
              Update Info
              </button>
              
        <Modal
                isOpen={this.state.showModal}
                onRequestClose={this.closeModal}
                contentLabel="Update Email"
                >
                <div className="modal">
                  <div className="modal-prompt">
                    <h2>Update Info</h2>
                  </div>
                  <div className="modal-button-container">
                    <input className="settingsInput"onEnter={this.closeModal}
                    type='text'
                    placeholder='Name'
                    >
                    </input>
                    <input className="settingsInput"onEnter={this.closeModal}
                    type='text'
                    placeholder='Email'
                    >
                    </input> 
                    <input className="settingsInput"onEnter={this.closeModal}
                    type='password'
                    placeholder='Password'
                    >
                    </input>
                    <input className="settingsInput"onEnter={this.closeModal}
                    type='number'
                    placeholder='Phone Number'
                    >
                    </input>
                  </div>
                    <button className= 'settingsCloseButton' type='button'onClick={this.closeModal}>Submit</button>
                </div>
              </Modal>
      </div>
    );
  }
}
                  
                   
                    
                      
                    
                      
                    
                      
        

        

export default Settings;
