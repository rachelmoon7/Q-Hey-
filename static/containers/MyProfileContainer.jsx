const MyProfileContainer = () => {
  const [username, setUsername] = React.useState('');

  React.useEffect(() => {
    fetch('/whose-profile')
    .then((response) => response.json())
    .then((result) => {
        setUsername(result)
    })
}, []);
  return (
    <div>
      <h2>Hey, {username}</h2>
      <MyPostsThisWeek />
      <MyPreviousPosts />
    </div>
  );
};

ReactDOM.render(<MyProfileContainer />, document.querySelector('#my-profile-container'))