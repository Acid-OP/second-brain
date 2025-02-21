import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Sidebar } from "../components/Sidebar";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useContent } from "../hooks/usecontent";

export function Dashboard() {
    const [modalOpen, setModalOpen] = useState(false);
    const { contents, refresh } = useContent();
    const [filter, setFilter] = useState<"Second Brain" | "youtube" | "twitter" | "reddit">("Second Brain"); // Track selected filter

    useEffect(() => {
        refresh();
    }, [modalOpen]);

    // Filter contents based on selected type
    const filteredContents = contents.filter(({ type }) =>
        filter === "Second Brain" ? type : type === filter
    );


    return (
        <>
        <div>

            <Sidebar setFilter={setFilter} /> 

            <div className="p-4 ml-72 min-h-screen bg-gray-100 border-slate-200 border-2">
            <CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)} />
                <div className="flex justify-end gap-4">
                 
                    <Button onClick={() => {
          setModalOpen(true)
        }} variant="primary" text="Add content" startIcon={<PlusIcon />}></Button>
            
                   <Button
                        onClick={async () => {
                            const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, { share: true }, {
                                headers: { "Authorization": localStorage.getItem("token") }
                            });
                            const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
                            alert(shareUrl);
                        }}
                        variant="secondary"
                        text="Share brain"
                        startIcon={<ShareIcon />}
                    />
                
                </div> 
                <div className="flex gap-4 flex-wrap">
                    {filteredContents.map(({ type, link, title }) => (
                        <Card key={link} type={type} link={link} title={title} />
                    ))}
                </div>
            </div>
        </div>
    </>

    );
}
