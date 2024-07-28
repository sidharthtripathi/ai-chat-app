
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { PersonIcon } from "@radix-ui/react-icons"
import { useState } from "react"
import {v4 as uuid} from 'uuid'

export default function Component() {
  const [messages,setMessages] = useState<{text:string,bot:boolean}[]>([])
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
        <div className="text-xl font-bold">AI Chat App</div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <SearchIcon className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <Button variant="ghost" size="icon">
            <SettingsIcon className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Button>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <div className="flex flex-col gap-2">
          {
            messages.map(msg=>{
              if(msg.bot) return <ReceivedMessage key={uuid()} text={msg.text}/>
              else return <SentMessage key={uuid()} text={msg.text} />
            })
          }
        </div>
      </div>
     <MessageForm setMsgs={setMessages}/>
    </div>
  )
}

function MessageForm({setMsgs} : {setMsgs : React.Dispatch<React.SetStateAction<{
  text: string;
  bot: boolean;
}[]>>}){
  const [msg,setMsg] = useState("")
  const baseURL = "https://ai-backend-production.up.railway.app"
  return (
    <div className="border-t py-4 px-6">
    <div className="flex items-center gap-2">
      <Input id="message" placeholder="Type your message..." className="flex-1" autoComplete="off" value={msg} onChange={(e)=>{setMsg(e.target.value)}} />
      <Button type="submit" size="icon"
      onClick={()=>{
        setMsgs((p)=>[...p,{text:msg,bot:false}])
        fetch(`${baseURL}/prompt`,{
          method : "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body : JSON.stringify({prompt : msg})
        }).then(res=>res.text())
        .then(reply=>{
          setMsgs((p)=>[...p,{text:reply,bot:true}])
        })
      }}
      >
        <SendIcon className="h-5 w-5" />
        <span className="sr-only">Send</span>
      </Button>
    </div>
  </div>
  )
}

function SentMessage({text} : {text:string}){
  return (
    <div className="flex items-start gap-3 justify-end">
            <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-[65%]">
              <p>{text}</p>
              
            </div>
            <Avatar className="w-10 h-10 border">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback><PersonIcon/></AvatarFallback>
            </Avatar>
          </div>
  )
}

function ReceivedMessage({text} : {text:string}){
  return (
    <div className="flex items-start gap-3">
           
            <Avatar className="w-10 h-10 border">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>
                <BotIcon className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div className="bg-muted rounded-lg p-3 max-w-[65%]">
              <p>{text}</p>
            </div>
          </div>
  )
}

function BotIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  )
}


function SearchIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}


function SendIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  )
}


function SettingsIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}


