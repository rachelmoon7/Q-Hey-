const Upload = () => {
    const [showImgForm2, setShowImgForm2] = React.useState(false);
    const [showAddAnother, setShowAddAnother] = React.useState(false);
    const [imgURL, setImgURL] = React.useState('');
    const [img, setImg] = React.useState('');
    const [imgURL2, setImgURL2] = React.useState('');
    const [img2, setImg2] = React.useState('');
    const [caption, setCaption] = React.useState('');
    const [entry, setEntry] = React.useState([]);


    const getCloudinaryLink = (file) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "pba5lu5s");
        
        fetch("https://api.cloudinary.com/v1_1/dvbrrbcum/image/upload"
        , {
            method: 'POST',            
            body: data
        })
        .then((response) => response.json())
        .then((result) => {
            if (imgURL == "") {
                console.log("entering IF");
                setImgURL(result.url);
                setImg(result.url)
            } else {
                console.log("ENTERING ELSE");
                setImgURL2(result.url);
                setImg2(result.url)
            }
        });
    };

    const upload = () => {
        
        fetch('/post-form-data', {
            method:'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "img1": imgURL, 
                                   "img2": imgURL2, 
                                   "caption": caption 
                                })
        })
        .then((response) => response.json())
        .then((result) => {
            setEntry(result[0]);
            //maybe another fetch request here to server to go to landing with my post 
        })
    };

   
    return (
        <React.Fragment> 
            <input type="file" onChange={(e)=> {setShowAddAnother(true), getCloudinaryLink(e.target.files[0])} } ></input>         
              
            {showAddAnother ? 
            <button onClick = {() => setShowImgForm2(true)}>Add 2nd photo</button>
            : <div></div>
            }
            
           {showImgForm2 ? 
            <input type="file" onChange={(e)=> {getCloudinaryLink(e.target.files[0])}}></input>         
            : <div></div>  
            }

            <div>Chosen image:</div>
            <div>
                <img src={img}/>
            </div>
            <div>Chosen 2nd image:</div>
            <div>
                <img src={img2}/>
            </div>
            
            <div>
                <input type="text" placeholder="Type caption here" onChange={(e) => setCaption(e.target.value)}></input>
            </div>
            <button onClick = {upload}>POST</button> 
            
        </React.Fragment>
    )
}



ReactDOM.render(<Upload entry={entry}/>, document.querySelector("#reactUpload"));