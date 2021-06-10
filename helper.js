export const getTodoCountByUser = (user, todos) => {
    return todos?.filter((todo) => {
      return todo.userId === user.id && todo.completed === true;
    }).length
  }
  
  export const getPostCountByUser = (user, posts) => {
    return posts?.filter((post) => {
      return post.userId === user.id;
    }).length
  }
  
  export const getFilteredUsersBasedOnDomain = (users, selectedDomain) => {
    return selectedDomain === "all"
      ? users
      : users.filter((user) => {
          return user.email.endsWith(selectedDomain);
        });
  };