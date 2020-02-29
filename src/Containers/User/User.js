import React, { Component } from "react";
import "./User.scss";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import Loader from "../../Components/UI/loader/loader";
import moment from "moment";
import { fetchReadFullContact } from '../../store/actions/contacts';
import { fetchCategories } from "../../store/actions/categories";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    if (this.props.myCategories.length === 0) {
      await this.props.fetchCategories();
    }

    const index = this.props.myContactsFull.findIndex(
      user => user._id === this.props.match.params.id
    );
    if (index !== -1) {
      let obj = this.props.myContactsFull[index];
      obj.phoneNumber = obj.phone[0].value;
      obj.bornDate = moment(obj.bornDate).format("YYYY-MM-DD");

      if (!obj.category.hasOwnProperty("_id")) {
        const options = this.props.myCategories;
        const category = options.find(el => el._id === obj.category);
        obj.category = category;
      }

      this.setState( obj );
    } else {
      const userID = this.props.match.params.id;
      const categories = this.props.myCategories

      await this.props.fetchReadFullContact(userID, categories).then((userInfo) => this.setState( userInfo ))
    }
  }

  renderUser() {
    const {surname, name, phoneNumber, email, bornDate, category, position, information} = this.state

    return (
      <>
        <div className="title">
          <p className="name">
            {name} {surname}
          </p>
          <p className="info">{information}</p>
        </div>

        <div className="block">
          <p className="tag">Name</p>
          <p className="data">{name}</p>
        </div>

        <div className="block">
          <p className="tag">Surname</p>
          <p className="data">{surname}</p>
        </div>

        <div className="block">
          <p className="tag">Phone</p>
          <p className="data">{phoneNumber}</p>
        </div>

        <div className="block">
          <p className="tag">Email</p>
          <p className="data">{email}</p>
        </div>

        <div className="block">
          <p className="tag">Birthday</p>
          <p className="data">{bornDate}</p>
        </div>

        {category ? (
          <div className="block">
            <p className="tag">Category</p>
            <p className="data">{category.name}</p>
          </div>
        ) : null}

        <div className="block">
          <p className="tag">Position</p>
          <p className="data">{position}</p>
        </div>
      </>
    );
  }

  render() {
    return (
      <div className="User">
        <div className="header">
          <div className="burger">
            <button></button>
          </div>
          <div className="center">Contact info</div>
          <div className="option">
            <button>
              <NavLink to="/layout/contacts" onClick={this.props.openSideBar}>
                <i className="fas fa-times"></i>
              </NavLink>
            </button>
          </div>
        </div>

        <div className="user-info">
          { this.props.loading ? <Loader /> : this.renderUser() } 
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.contacts.loading,
    myContacts: state.contacts.myContacts,
    myContactsFull: state.contacts.myContactsFull,
    myCategories: state.categories.myCategories,
    loadingCategories: state.categories.categoreisIsLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    closeSideBar: () => dispatch({ type: "CLOSE" }),
    fetchReadFullContact: (user, categories) => dispatch(fetchReadFullContact(user, categories)),
    fetchCategories: () => dispatch(fetchCategories())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(User);