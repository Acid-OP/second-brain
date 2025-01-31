import { useState } from "react"
import { Button } from "../components/Button"
import { Card } from "../components/Card"
import { CreateContentModal } from "../components/CreateContentModal"
import { PlusIcon } from "../icons/PlusIcon"
import { ShareIcon } from "../icons/ShareIcon"
import { Sidebaar } from "../components/Sidebar"
export function Dashboard() {
  const [modalOpen , setModalOpen] = useState(false);
 
  return <div>
    <Sidebaar/>
  <div className="p-4 ml-72 min-h-screen bg-[#eeeeef] border-white border-2 ">
    <CreateContentModal open={modalOpen} onClose = {() => {
      setModalOpen(false);
    }} />
    <div className="flex justify-end gap-4">
    <Button onClick={() =>{
      setModalOpen(true);
    }} variant="primary" text="Add content" startIcon={<PlusIcon/>}></Button>
    <Button variant = "secondary" text = "Share Brain" startIcon={<ShareIcon/>}/>
    </div>

    <div className="flex gap-4">
      <Card type="twitter" link="https://x.com/GKapur31640/status/1868760156651372938" title="First tweet" />

      <Card type="youtube" link="https://www.youtube.com/watch?v=iELDSVnj2hE&t=41s" title="First video"/>

    </div>
</div>

</div>
}

