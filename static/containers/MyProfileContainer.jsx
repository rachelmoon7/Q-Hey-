const MyProfileContainer = () => {
  

  return (
    <div>
      <MyPostsThisWeek />
      <MyPreviousPosts />
    </div>
  );
};

ReactDOM.render(<MyProfileContainer />, document.querySelector('#my-profile-container'))