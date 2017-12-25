import React from "react";
import AddFishForm from "./AddFishForm";
import PropTypes from "prop-types";
import { base, app, facebookProvider, githubProvider } from "../base";

class Inventory extends React.Component {
  constructor() {
    super();
    this.renderInventory = this.renderInventory.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.logout = this.logout.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      uid: null,
      owner: null
    };
  }

  componentDidMount() {
    app.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        this.authHandler(user);
      } else {
        // No user is signed in.
      }
    });
  }

  handleChange(e, key) {
    const fish = this.props.fishes[key];
    // take a copy of that fish and update it with the new data
    const updatedFish = {
      ...fish,
      [e.target.name]: e.target.value
    };
    this.props.updateFish(key, updatedFish);
  }

  authenticate(provider) {
    console.log(`Trying to log in with ${provider}`);

    app
      .auth()
      .signInWithPopup(provider)
      .then(this.authHandler)
      .catch(err => {
        console.error(err);
      });
  }

  logout() {
    app
      .auth()
      .signOut()
      .then(() => {
        this.setState({
          uid: null
        })
      })
      .catch((error) => {
        console.error(error)
      });
  }

  authHandler(authData) {
    console.log(authData);
    // grab the store info
    const storeRef = app.database().ref(this.props.storeId);
    // query the firebase once for the store data
    storeRef.once("value", snapshot => {
      const data = snapshot.val() || {};
      const user = authData.user || authData;

      // claim it as our own if there is no owner already
      if (!data.owner) {
        storeRef.set({
          owner: user.uid
        });
      }

      this.setState({
        uid: user.uid,
        owner: data.owner || user.uid
      });
    });
  }

  renderLogin() {
    return (
      <nav className="login">
        <h2>Inventory</h2>
        <p>Sign in to manage your store's inventory</p>
        <button
          className="github"
          onClick={() => this.authenticate(githubProvider)}
        >
          Log In with Github
        </button>
        <button
          className="facebook"
          onClick={() => this.authenticate(facebookProvider)}
        >
          Log In with Facebook
        </button>
        <button
          className="twitter"
          onClick={() => this.authenticate("twitter")}
        >
          Log In with Twitter
        </button>
      </nav>
    );
  }

  renderInventory(key) {
    const fish = this.props.fishes[key];
    return (
      <div className="fish-edit" key={key}>
        <input
          type="text"
          name="name"
          value={fish.name}
          placeholder="Fish Name"
          onChange={e => this.handleChange(e, key)}
        />
        <input
          type="text"
          name="price"
          value={fish.price}
          placeholder="Fish Price"
          onChange={e => this.handleChange(e, key)}
        />
        <select
          type="text"
          name="status"
          value={fish.status}
          placeholder="Fish Status"
          onChange={e => this.handleChange(e, key)}
        >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea
          type="text"
          name="desc"
          value={fish.desc}
          placeholder="Fish Desc"
          onChange={e => this.handleChange(e, key)}
        />
        <input
          type="text"
          name="image"
          value={fish.image}
          placeholder="Fish Image"
          onChange={e => this.handleChange(e, key)}
        />
        <button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
      </div>
    );
  }
  render() {
    const logout = <button onClick={this.logout}>Log Out!</button>;

    // check if they are no logged in at all
    if (!this.state.uid) {
      return <div>{this.renderLogin()}</div>;
    }

    // Check if they are owner of the current store
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry you are not the owner of this store!</p>
          {logout}
        </div>
      );
    }

    return (
      <div>
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map(this.renderInventory)}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    );
  }
}

Inventory.propTypes = {
  fishes: PropTypes.object.isRequired,
  updateFish: PropTypes.func.isRequired,
  removeFish: PropTypes.func.isRequired,
  addFish: PropTypes.func.isRequired,
  loadSamples: PropTypes.func.isRequired,
  storeId: PropTypes.string.isRequired
};

export default Inventory;
