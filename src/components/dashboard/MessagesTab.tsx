import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Search, MoreVertical, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function MessagesTab() {
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [msgContent, setMsgContent] = useState("");
    const [emailOpen, setEmailOpen] = useState(false);
    const [emailData, setEmailData] = useState({ subject: "", body: "" });
    const queryClient = useQueryClient();

    const { data: messages, isLoading } = useQuery({
        queryKey: ['messages'],
        queryFn: async () => {
            const res = await api.get('/messages');
            return res.data;
        }
    });

    const sendMutation = useMutation({
        mutationFn: async (data: any) => {
            const res = await api.post('/messages', data);
            return res.data;
        },
        onSuccess: () => {
            setMsgContent("");
            queryClient.invalidateQueries({ queryKey: ['messages'] });
        }
    });

    const emailMutation = useMutation({
        mutationFn: async (data: any) => {
            const res = await api.post('/messages/email', data);
            return res.data;
        },
        onSuccess: () => {
            setEmailOpen(false);
            setEmailData({ subject: "", body: "" });
            toast.success("Email sent to parent successfully!");
        }
    });

    // Group messages by contact
    const contacts = messages ? Array.from(new Set(messages.map((m: any) =>
        m.senderId === api.defaults.headers.common['Authorization'] ? m.receiverId : m.senderId
    ))).map(id => {
        const msg = messages.find((m: any) => m.senderId === id || m.receiverId === id);
        return msg.senderId === id ? msg.sender : msg.receiver;
    }) : [];

    const [recipientId, setRecipientId] = useState<string>("");

    // Fetch all students to populate the "To" dropdown
    const { data: allStudents } = useQuery({
        queryKey: ['students-roster-email'],
        queryFn: async () => {
            const res = await api.get('/students/roster');
            return res.data;
        }
    });

    // When opening dialog, set recipient if a user is already selected in chat
    const handleOpenEmail = (open: boolean) => {
        if (open && selectedUser) {
            setRecipientId(selectedUser.id);
        }
        setEmailOpen(open);
    };

    return (
        <div className="h-[calc(100vh-180px)] bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex">
            {/* Contact List */}
            <div className="w-80 border-r border-slate-100 flex flex-col">
                <div className="p-6 border-b border-slate-50 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg text-slate-800">Chats</h3>
                        <Dialog open={emailOpen} onOpenChange={handleOpenEmail}>
                            <DialogTrigger asChild>
                                <Button size="sm" variant="outline" className="h-8 text-xs font-bold border-indigo-200 text-indigo-600 hover:bg-indigo-50">
                                    Compose Email
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Send Email to Parent/Student</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                        <Label>To</Label>
                                        <Select value={recipientId} onValueChange={setRecipientId}>
                                            <SelectTrigger className="bg-slate-50">
                                                <SelectValue placeholder="Select Recipient" />
                                            </SelectTrigger>
                                            <SelectContent className="max-h-60">
                                                {allStudents?.map((s: any) => (
                                                    <SelectItem key={s.id} value={s.id}>
                                                        {s.name} (Grade {s.grade}-{s.section})
                                                    </SelectItem>
                                                ))}
                                                {/* Also include current chat contacts if not in student list */}
                                                {contacts.filter((c: any) => !allStudents?.find((s: any) => s.id === c.id)).map((c: any) => (
                                                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Subject</Label>
                                        <Input
                                            placeholder="Regarding student progress..."
                                            value={emailData.subject}
                                            onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Message Body</Label>
                                        <Textarea
                                            placeholder="Dear Parent..."
                                            className="h-32 resize-none"
                                            value={emailData.body}
                                            onChange={(e) => setEmailData({ ...emailData, body: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button onClick={() => setEmailOpen(false)} variant="ghost">Cancel</Button>
                                    <Button
                                        onClick={() => emailMutation.mutate({ parentId: recipientId, ...emailData })}
                                        disabled={!recipientId || !emailData.subject || !emailData.body || emailMutation.isPending}
                                        className="bg-indigo-600 text-white font-bold"
                                    >
                                        {emailMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                        Send Email
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <Input className="pl-10 bg-slate-50 border-none rounded-xl" placeholder="Search chats..." />
                    </div>
                </div>
                <div className="flex-1 overflow-auto">
                    {contacts.map((contact: any) => (
                        <button
                            key={contact.id}
                            onClick={() => setSelectedUser(contact)}
                            className={`w-full flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors ${selectedUser?.id === contact.id ? 'bg-indigo-50/50 border-r-4 border-indigo-500' : ''}`}
                        >
                            <Avatar className="w-12 h-12 border-2 border-white shadow-sm">
                                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${contact.name}`} />
                                <AvatarFallback>{contact.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="text-left flex-1">
                                <h4 className="font-bold text-slate-900 text-sm">{contact.name}</h4>
                                <p className="text-xs text-slate-500 font-medium">Last message...</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-slate-50/30">
                {selectedUser ? (
                    <>
                        <div className="p-6 bg-white border-b border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Avatar className="w-10 h-10">
                                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedUser.name}`} />
                                </Avatar>
                                <div>
                                    <h3 className="font-bold text-slate-900">{selectedUser.name}</h3>
                                    <span className="text-[10px] font-bold text-emerald-500 uppercase">Online</span>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon"><MoreVertical className="w-5 h-5" /></Button>
                        </div>

                        <div className="flex-1 p-8 overflow-auto space-y-6">
                            {messages?.filter((m: any) => m.senderId === selectedUser.id || m.receiverId === selectedUser.id).map((m: any) => (
                                <div key={m.id} className={`flex ${m.senderId === selectedUser.id ? 'justify-start' : 'justify-end'}`}>
                                    <div className={`max-w-[70%] p-4 rounded-2xl text-sm font-medium shadow-sm ${m.senderId === selectedUser.id ? 'bg-white text-slate-700 rounded-tl-none' : 'bg-indigo-600 text-white rounded-tr-none'}`}>
                                        {m.content}
                                        <div className={`mt-1 text-[10px] opacity-60 flex items-center justify-end gap-1`}>
                                            {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            {m.senderId !== selectedUser.id && <CheckCircle2 className="w-3 h-3" />}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-6 bg-white border-t border-slate-100">
                            <form
                                onSubmit={(e) => { e.preventDefault(); sendMutation.mutate({ receiverId: selectedUser.id, content: msgContent }); }}
                                className="flex items-center gap-4"
                            >
                                <Input
                                    value={msgContent}
                                    onChange={(e) => setMsgContent(e.target.value)}
                                    className="flex-1 bg-slate-50 border-none rounded-2xl h-12 px-6 font-medium"
                                    placeholder="Type a message..."
                                />
                                <Button type="submit" className="w-12 h-12 rounded-2xl bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-100 p-0">
                                    <Send className="w-5 h-5" />
                                </Button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-4">
                        <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center">
                            <Send className="w-10 h-10 opacity-20" />
                        </div>
                        <p className="font-medium">Select a contact to start messaging</p>
                    </div>
                )}
            </div>
        </div>
    );
}
