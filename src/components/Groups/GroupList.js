import React from 'react'
import { FirebaseContext } from '../../firebase/index'
import '../../styles/index.css'

const GroupTasklist = props => {
    return (
<table> 
    <thead>
    <tr className="Static_Table">
                  <th>Chore</th>
                  <th>Assigned</th>
                  <th>Date</th>
                  <th>Done</th>
                  <th>Actions</th>
              </tr>
      <tr>
          <th>Dishes</th>
          <th>Michael</th>
          <th>June 3rd</th>
                <th className="switch">
                    <label>
                        no
                        <input type="checkbox"></input>
                        <span className="lever"></span>
                        yes
                    </label>
                </th>
            <th>
                <button className="btn waves-effect waves-light blue darken-1" type="submit" name="action">B</button>
                <button className="btn waves-effect waves-light green darken-1" type="submit" name="action">G</button>
                <button className="btn waves-effect waves-light red darken-1" type="submit" name="action">R</button>
            </th>
      </tr>
    </thead>
</table>
      )
    ;
  };

  export default GroupTasklist