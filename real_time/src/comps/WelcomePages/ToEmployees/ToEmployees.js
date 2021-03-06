import React, { Component } from "react";
import "./ToEmployees.css";
import "bootstrap/dist/css/bootstrap.css";
import Carousel from "react-bootstrap/Carousel";
import handshake from './handshake.png'
import fire from "../../../firebaseConfig";

class ToEmployees extends Component {

  state = {
    hot_jobs_list: []
  }

  componentDidMount() {
    const db = fire.database();
    db.ref("/jobs/jobs_list").on("value", snapshot => {
      let allJobs = [];
      snapshot.forEach(snap => {
        if(snap.val().is_fire && allJobs.length < 5){
          allJobs.push(snap);
        }
      });
      this.setState({ hot_jobs_list: allJobs});
    });
  }

  render() {
    return (
      <div id="toEmployees">
        <div id="employees_top">
          <div id="employees_top_right">
            <img
              id="employees_phone_pic"
              src={require("./phone_pic.jpg")}
              alt="guy with a phone"
            />
          </div>
          <div id="employees_p1">
            מחפשים עבודה? בשביל זה אנחנו כאן!
          <br />
          </div>
          <div id="employees_p2">
            בזמן אמת, ביכולתנו לסייע לנוער וצעירים/ות המחפשים הכנסה
          <br />
          כספית על בסיס יומי דרך הצעות עבודה אטרקטיביות.
          <br />
          נכנסנים לאתר ומקבלים הצעות עבודה יומיות וגמישות ללא
          <br />
          מחויבות לכמות משמרות במגוון מקצועות וענפים ברחבי ירושלים.
        </div>
          <div id="employees_top_left">
            <img
              id="employees_waiter_pic"
              src={require("./waiter_pic.jpg")}
              alt="waiter"
            />
          </div>
        </div>
        <p></p>
        <div id="carousel_container">
          <label id="hot_jobs_carousel">משרות חמות</label>
          <Carousel id="carousel">
            {
              this.state.hot_jobs_list.map((job, index) => {
                return (
                  <Carousel.Item className="carousel_item" key={index}>
                    <div className="job_pic">
                      <img src={handshake} width="55%" alt="service" />
                    </div>
                    <Carousel.Caption>
                      <div id="hot_job_details">
                        <p>{job.val().type}</p>
                        <p>{job.val().place} | {job.val().date}</p>
                        <p>{job.val().salary}₪</p>
                      </div>
                    </Carousel.Caption>
                  </Carousel.Item>
                );
              })
            }
          </Carousel>
        </div>
        <p />
        <div id="employees_p3">
          <div id="employees_p3_empty">
            <img
              id="employees_hands_pic"
              src={require("./employees_hands.jpg")}
              alt="hands"
            />
          </div>
          <div id="employees_p3_text">
            אנחנו ב'זמן אמת' בחרנו בשבילכם/ן את העסקים הכי טובים בירושלים.
          <br />
          אתם רק צריכים להחליט מתי, איפה וכמה בא לכם/ן לעבוד!
          <br />
          אנחנו מודעים לקשיים שנוצרו במציאת עבודה בעקבות משבר הקורונה.
          <br />
          לכן, בזמן אמת החלטנו לפתח טכנולוגיה שתעזור לכם למצוא עבודה
          <br />
          מכל מקום ובכל זמן בקליק אחד!
        </div>
          <div id="employees_p3_pic"></div>
        </div>

        <div id="employees_p4">אכפת לנו!</div>
        <div id="employees_p5">
          <br />
        לנו ב'זמן אמת' אכפת מכם! לכן אנחנו עובדים אך ורק עם מעסיקים הוגנים.
        <br />
        חשוב לנו ללוות אתכם, ולדאוג שתקבלו את כל הזכויות המגיעות
        <br />
        לכם - שכר לפי חוק, שעות נוספות, שעות שבת וחג, תנאים סוציאליים.
      </div>
      </div>
    );
  }
};
export default ToEmployees;
