import React, {Component} from "react";
import { Meteor } from "meteor/meteor";



export default class Tweet extends Component {
  render() {
    return (<div className="tweet">
      <img src={this.props.tweet.user.profile_image_url} alt={this.props.tweet.user.screen_name + "profile image"}/>
    	<span>{this.props.tweet.user.screen_name} </span>
      <span>{this.props.tweet.text} </span>
    </div>);
  }
}
