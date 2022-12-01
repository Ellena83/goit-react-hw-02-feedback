import { Component } from "react";
import { Section } from "./Section/Section";
import { Statistics } from "./Statistics/Statistics";
import { FeedbackOptions } from "./FeedbackOptions/FeedbackOptions";
 import { Notification } from './Notification/Notification';
import css from "./App.module.css";

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  countTotalFeedback = () => {
      const { good, neutral, bad } = this.state;
      return good + neutral + bad;
    };

  countPositiveFeedbackPercentage = () => {
      const totalFeedBack = this.countTotalFeedback();
      const goodFeedBack = this.state.good;
      let result = 0;

      if (totalFeedBack > 0) {
        result = Math.ceil((goodFeedBack / totalFeedBack) * 100);
     }
      return `${result}%`;
    }

  handleClickButton = (evt) => {
    const option = evt.target.name;
    if (option) {
      this.setState(prevState => ({ [option]: prevState[option] + 1 }));
    }
  }

  render() {
    const { good, neutral, bad } = this.state;
    const options = Object.keys(this.state);
    const countTotalFeedback = this.countTotalFeedback();
    const positiveFeedback = this.countPositiveFeedbackPercentage();
    const clickButton = this.handleClickButton;

    return (
      <div className={css.wrapper}>
        <div className={css.container}>

          <Section  title="Please leave feedback" 
                    className={css.section}>

            <FeedbackOptions
              options={options}
             onLeaveFeedback={clickButton}
            />
          </Section>

                     <Section title="Statistics" >
          {countTotalFeedback > 0 ? (<Statistics 
                good={good}
                neutral={neutral}
                bad={bad}
                total={countTotalFeedback}
                positivePercentage={positiveFeedback} />) :
                (<Notification message="There is no feedback" />) 
             } 
            </Section> 
        </div>
      </div>
    );
  }
}