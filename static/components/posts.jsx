const Upload = () => {
    const [showImgForm2, setShowImgForm2] = React.useState(false);
    const [showAddAnother, setShowAddAnother] = React.useState(false);
    const [imgURL1, setImgURL1] = React.useState('');
    const [imgURL2, setImgURL2] = React.useState('');
    const [caption, setCaption] = React.useState('');

    const uploadImage = (files) => {
        console.log(files[0])
    }

    const firstUpload = () => {
        const data = new FormData()
        data.append("file", imgURL1)
        data.append("upload_preset", "pba5lu5s")
        
        fetch("https://api.cloudinary.com/v1_1/dvbrrbcum/image/upload"
        , {
            method: 'POST',            
            body: data
        })
        .then((response) => response.json())
        .then((result) => {
            setImgURL1(result.url);
            setShowAddAnother(true);
            console.log("%%%", showAddAnother)

        }
    )}
    return (
        <React.Fragment> 
            <input type="file" onChange={(e)=> {setImgURL1(e.target.files[0])}}></input>         
            <button onClick = {firstUpload}>Upload Photo</button>           
            <div>
                <img src={imgURL1}/>
            </div>
        </React.Fragment>
    )


}

ReactDOM.render(<Upload />, document.querySelector("#reactUpload"))