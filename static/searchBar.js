
const SearchBar = () => {
    
    const [hahaha, setHahaha] = React.useState('');

    return (
        <div>
            <input type="text" placeholder="Find friends" onChange={(e) => setHahaha(e.target.value)}></input>
            <p>
                {hahaha}
            </p>
        </div>
    );   
}

ReactDOM.render(<SearchBar />, document.querySelector('#root'))
