import React, { PureComponent } from "react";
import { getTodos, getUsers, getPosts } from "./service";
import * as helper from "./helper";


export default class App extends PureComponent {
  defaultDomainIndex = 0;
  domains = [
    "all",
    ".biz",
    ".tv",
    ".net",
    ".org",
    ".ca",
    ".info",
    ".me",
    ".io",
  ];
  todos = null;
  posts = null;
  state = {
    users: [],
    selectedDomain: "all",
    filter: this.domains[this.defaultDomainIndex],
  };

  async componentDidMount() {
    const users = await getUsers();
    this.todos = await getTodos();
    this.posts = await getPosts();
    this.setState({ users });
  }

  listUsers(users) {
    const {selectedDomain} =this.state
    const usersToShow = helper.getFilteredUsersBasedOnDomain(
      users,
      selectedDomain
    );
    return (
      <ul>
        {usersToShow.map((user) => {
          return (
            <li key={user.name}>
              {user.name} has completed{" "}
              {helper.getTodoCountByUser(user, this.todos)} todos and has{" "}
              {helper.getPostCountByUser(user, this.posts)} posts
            </li>
          );
        })}
      </ul>
    );
  }

  handleSelect = ({target}) => {
    this.setState({
      selectedDomain: target.value,
    });
  };

  renderDropDown() {
    return (
      <select onChange={this.handleSelect}>
        {this.domains.map((domain) => (
          <option key={domain} value={domain}>
            {domain}
          </option>
        ))}
      </select>
    );
  }

  render() {
    const { users } = this.state;
    return (
      <>
        {this.renderDropDown()}
        {this.listUsers(users)}
      </>
    );
  }
}
