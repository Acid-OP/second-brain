import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./InputBox";
import { BACKEND_URL } from "../config";
import axios from "axios";

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter",
    Reddit = "reddit"
}

// controlled component
// @ts-ignore 
export function CreateContentModal({open, onClose}) {
    const titleRef = useRef<HTMLInputElement>();
    const linkRef = useRef<HTMLInputElement>();
    const [type, setType] = useState(ContentType.Youtube);

    async function addContent() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;

        await axios.post(`${BACKEND_URL}/api/v1/content`, {
            link,
            title,
            type
        }, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })

        onClose();

    }
    

    return <div >
        {open && <div> 
            {/* <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center">
               
            </div> */}
            <div className="relative ">
            <div className="w-screen h-screen fixed  left-0 flex justify-center">
            </div>
                {/* <div className="flex flex-col items-start justify-start"> */}
                    <div className="bg-white opacity-100 p-2 flex flex-col w-[16vw] rounded fixed">
                        {/* <div className="flex justify-end"> */}
                            <div onClick={onClose} className="cursor-pointer flex justify-end">
                                <CrossIcon />
                            </div>
                        {/* </div> */}
                        <div className="flex justify-center flex-col items-center">
                            <Input reference={titleRef} placeholder={"Title"} />
                            <Input reference={linkRef} placeholder={"Link"} />
                        </div>
                        <div>
                            <div className="font-light">Type</div>
                            <div className="flex gap-1 justify-center pb-2">
                                <Button text="Youtube" variant={type === ContentType.Youtube ? "primary" : "secondary"} onClick={() => {
                                    setType(ContentType.Youtube)
                                }}></Button>
                                <Button text="Twitter" variant={type === ContentType.Twitter ? "primary" : "secondary"} onClick={() => {
                                    setType(ContentType.Twitter)
                                }}></Button>
                                   <Button text="Reddit" variant={type === ContentType.Reddit ? "primary" : "secondary"} onClick={() => {
                                    setType(ContentType.Reddit)
                                }}></Button>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <Button onClick={addContent} variant="primary" text="Submit" />
                        </div>
                    {/* </div> */}
                </div>     
            </div>
            
        </div>}
    </div>

}