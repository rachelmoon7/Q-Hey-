const NewPost = (props) => {
    const [showImgForm2, setShowImgForm2] = React.useState(false);
    const [showAddAnother, setShowAddAnother] = React.useState(false);
    const [imgURL, setImgURL] = React.useState('');
    const [img, setImg] = React.useState('');
    const [imgURL2, setImgURL2] = React.useState('');
    const [img2, setImg2] = React.useState('');
    const [caption, setCaption] = React.useState('');
    const [showChosenImage, setShowChosenImage] = React.useState(false);
    const [showChosenImage2, setShowChosenImage2] = React.useState(false);
    const [chooseFile, setChooseFile] = React.useState('');
    const [chooseFile2, setChooseFile2] = React.useState('1');
    const [postingOption, setPostingOption] = React.useState(false);

    const showPostingOption = () => {
        setPostingOption(true);
    }

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
            console.log("!!result:", result)
            if (imgURL == "") {
                console.log("*ENTERING IF - 1st img");
                setImgURL(result.url);
                setImg(result.url)
                setShowChosenImage(true)
            } else {
                console.log("*ENTERING ELSE - 2nd img");
                setImgURL2(result.url);
                setImg2(result.url)
                setShowChosenImage2(true)
                setCaption('')
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
            console.log("NEWPOST RESULT:", result);
            props.setAllLandingPosts(result);

            if (props.newPostComments==false) {
                props.setNewPostComments(true);
            } else {
                props.setNewPostComments(false);
            }
            
            if (props.newPostReactions==false) {
                props.setNewPostReactions(true);
            } else {
                props.setNewPostReactions(false);
            }
            
            setShowImgForm2(false);
            setImgURL('');
            setImg('');
            setShowChosenImage(false);
            setImgURL2('');
            setImg2('');
            setShowChosenImage2(false);
            setCaption('');
            setChooseFile(null);
            setChooseFile2(null);
            setPostingOption(false);
        })

    };
    console.log("postingOption:", postingOption)
   //when key is changed, re-renders input tag for enhanced user experience
    return (
        <React.Fragment> 
            <span><button id="answer" onClick={showPostingOption}>Post an Answer</button></span>

            {postingOption ?
                <div>
                    <input 
                        type="file" key={chooseFile} onChange={(e)=> {
                                                                    setShowAddAnother(true);
                                                                    getCloudinaryLink(e.target.files[0]); 
                                                                    }
                                                                } >
                    </input>          

                    {showAddAnother ? 
                        <button onClick={() => {setShowImgForm2(true), setShowAddAnother(false)}}>Add 2nd photo</button>
                        : <div></div>
                    }
                    
                    {showImgForm2 ? 
                        <input type="file" key={chooseFile2} onChange={(e)=> {getCloudinaryLink(e.target.files[0])}}></input>         
                        : <div></div>  
                    }

                    {showChosenImage ?
                        <div>
                            <div>Chosen image:</div>
                            <div>
                                <img src={img}/>
                            </div>
                        </div>
                        : <div></div>
                    }
                    
                    {showChosenImage2 ?
                        <div>
                            <div>Chosen 2nd image:</div>
                            <div>
                                <img src={img2}/>
                            </div>
                        </div>
                        : <div></div>
                    }
                
                    <div>
                        <input type="text" placeholder="Type caption here" value = {caption} onChange={(e) => setCaption(e.target.value)}></input>
                    </div>

                    <button id="post-button" onClick = {upload}><i className="bi bi-plus-circle-fill"></i></button> 
                </div>
                : <div> </div>
            }
        </React.Fragment>
    );
}
