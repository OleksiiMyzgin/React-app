import React from "react";
import { getFunName } from "../helpers";
import PropTypes from "prop-types";

class StorePicker extends React.Component {
  // constructor() {
  //   super();
  //   this.goToStore = this.goToStore.bind(this);
  // }
  goToStore(e) {
    e.preventDefault();
    console.log("You Clicked");
    // forst wrap the text from the box
    console.log(this.storeInput.value);
    // second we are going to transition from / to / store / : storeId
    this.props.history.push(`/store/${this.storeInput.value}`);
  }

  render() {
    return (
      <form className="store-selector" onSubmit={e => this.goToStore(e)}>
        <h2>Please Enter A Store</h2>
        <input
          type="text"
          required
          placeholder="Store Name"
          defaultValue={getFunName()}
          ref={input => {
            this.storeInput = input;
          }}
        />
        <button type="submit"> Visit Store -></button>
      </form>
    );
  }
}

StorePicker.propTypes = {
  history: PropTypes.object.isRequired
}

export default StorePicker;
