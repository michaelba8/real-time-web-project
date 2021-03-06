import React from "react";
import "./EmployeeSettings.css";
import person from "./person.png";
import fire from "../../../firebaseConfig";

class EmployeeSettings extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmitSveChanges = this.onSubmitSveChanges.bind(this);
    this.editPicture = this.editPicture.bind(this);
    this.state = {
      email: this.props.user.email,
      first_name: this.props.user.first_name,
      last_name: this.props.user.last_name,
      phone_number: this.props.user.phone_number,
      birth_date: this.props.user.birth_date,
      address: this.props.user.address,
      favorite_jobs: this.props.user.favorite_jobs,
      about_me: this.props.user.about_me,
      picture: person,
      new_url: "",
    };
    var storage = fire
      .storage()
      .ref("/" + this.state.email + "/profile_pic.jpg");
    storage
      .getDownloadURL()
      .then((url) => {
        this.setState({ picture: url });
      })
      .catch(() => {
        this.setState({ picture: person });
      });
  }
  editPicture = () => {
    var storageRef = fire.storage();
    storageRef
      .ref(this.props.user.email + "/profile_pic.jpg")
      .put(this.state.new_url);
  };

  onChangePicture = (e) => {
    e.preventDefault();
    this.setState({ new_url: e.target.files[0] });
  };
  onSubmitSveChanges = (e) => {
    e.preventDefault();
    const db = fire.database();
    let newUser = {
      email: this.props.user.email,
      first_name: this.props.user.first_name,
      last_name: this.props.user.last_name,
      phone_number: this.props.user.phone_number,
      birth_date: this.props.user.birth_date,
      address: this.props.user.address,
      favorite_jobs: this.props.user.favorite_jobs,
      about_me: this.props.user.about_me,
    };
    if (this.first_name.value !== "") {
      newUser.first_name = this.first_name.value;
      db.ref("/employees/employees_list/" + this.props.index).update({
        first_name: newUser.first_name,
      });
    }
    if (this.last_name.value !== "") {
      newUser.last_name = this.last_name.value;
      db.ref("/employees/employees_list/" + this.props.index).update({
        last_name: newUser.last_name,
      });
    }
    if (this.phone_number.value !== "") {
      newUser.phone_number = this.phone_number.value;
      db.ref("/employees/employees_list/" + this.props.index).update({
        phone_number: newUser.phone_number,
      });
    }
    if (this.address.value !== "") {
      newUser.address = this.address.value;
      db.ref("/employees/employees_list/" + this.props.index).update({
        address: newUser.address,
      });
    }
    if (this.favorite_jobs.value !== "") {
      newUser.favorite_jobs = this.favorite_jobs.value;
      db.ref("/employees/employees_list/" + this.props.index).update({
        favorite_jobs: newUser.favorite_jobs,
      });
    }
    if (this.about_me.value !== "") {
      newUser.about_me = this.about_me.value;
      db.ref("/employees/employees_list/" + this.props.index).update({
        about_me: newUser.about_me,
      });
    }
    if (this.state.new_url !== "") {
      this.editPicture();
    }
    this.props.setUser(newUser);
    this.props.clickConnectEmployee(newUser, this.props.index);
    //this.forceUpdate();
  };

  render() {
    return (
      <div id="settings_container">
        <form action="" method="post" onSubmit={this.onSubmitSveChanges}>
          <div id="settings_employee">
            <div className="user_pic">
              <img
                id="emloyee_image"
                src={this.state.picture}
                alt="user pic"
              ></img>
            </div>
            <div id="employee_name">
              {this.props.user.first_name} {this.props.user.last_name}
            </div>

            <div id="edit_pic_con">
              <input
                id="pic_input"
                type="file"
                name="picture"
                onChange={this.onChangePicture}
                accept="image/x-png,image/gif,image/jpeg"
                class="hidden"
              />
              <label id="pictureButton" for="pic_input">
                שנה תמונה
              </label>
            </div>
            <div id="employee_details_to_edit">
              <div id="first_name_to_edit">
                <fieldset>
                  <label>שם פרטי:</label>
                  <br />
                  <input
                    className="field"
                    placeholder={this.props.user.first_name}
                    type="text"
                    ref={(c) => (this.first_name = c)}
                    tabIndex="2"
                    autoFocus
                  />
                </fieldset>
              </div>
              <div id="last_name_to_edit">
                <fieldset>
                  <label>שם משפחה:</label>
                  <br />
                  <input
                    className="field"
                    placeholder={this.props.user.last_name}
                    type="text"
                    ref={(c) => (this.last_name = c)}
                    tabIndex="2"
                    autoFocus
                  />
                </fieldset>
              </div>
              <div id="photo_to_edit">
                <fieldset>
                  <label>טלפון:</label>
                  <br />
                  <input
                    className="field"
                    placeholder={this.props.user.phone_number}
                    ref={(c) => (this.phone_number = c)}
                    type="text"
                    tabIndex="2"
                  />
                </fieldset>
              </div>

              <div id="birthday_to_edit">
                <fieldset>
                  <label>תאריך לידה:</label>
                  <br />
                  <input
                    className="field"
                    value={this.props.user.birth_date}
                    type="date"
                    tabIndex="3"
                  />
                </fieldset>
              </div>

              <fieldset>
                <label>אימייל:</label>
                <br />
                <input
                  id="email_to_edit"
                  value={this.props.user.email}
                  type="email"
                  tabIndex="2"
                />
              </fieldset>

              <fieldset>
                <label>כתובת מלאה:</label>
                <br />
                <input
                  id="addres_field"
                  placeholder={this.props.user.address}
                  type="text"
                  ref={(c) => (this.address = c)}
                  tabIndex="2"
                />
              </fieldset>
              <fieldset className="item_to_edit">
                <label>תחומי עבודה מועדפים:</label>
                <br />
                <input
                  id="favorite_job_field"
                  placeholder={this.props.user.favorite_jobs}
                  ref={(c) => (this.favorite_jobs = c)}
                  type="text"
                  tabIndex="2"
                />
              </fieldset>
              <fieldset>
                <label>קצת על עצמי:</label>
                <br />
                <textarea
                  id="about_myself_filed"
                  placeholder={this.props.user.about_me}
                  ref={(c) => (this.about_me = c)}
                  tabIndex="4"
                />
              </fieldset>
            </div>
            <div id="save_changes_con">
              <button
                id="save_changes_button"
                name="submit"
                type="submit"
                data-submit="...Sending"
              >
                שמור שינויים
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default EmployeeSettings;
