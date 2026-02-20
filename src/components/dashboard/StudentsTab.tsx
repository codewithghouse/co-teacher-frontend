import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, MoreVertical, Loader2, TrendingUp, TrendingDown, Mail, Plus, Pencil, Trash2, Send } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export function StudentsTab() {
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isEmailOpen, setIsEmailOpen] = useState(false);
    const [currentStudent, setCurrentStudent] = useState<any>(null);
    const [formData, setFormData] = useState({ name: "", email: "", grade: "", section: "", rollNo: "" });
    const [emailData, setEmailData] = useState({ subject: "", body: "" });
    const [searchQuery, setSearchQuery] = useState("");
    const queryClient = useQueryClient();

    const { data: students, isLoading } = useQuery({
        queryKey: ['students-roster'],
        queryFn: async () => {
            const res = await api.get('/students/roster');
            return res.data;
        }
    });

    const addStudentMutation = useMutation({
        mutationFn: async (data: any) => {
            const res = await api.post('/students', data);
            return res.data;
        },
        onSuccess: () => {
            setIsAddOpen(false);
            setFormData({ name: "", email: "", grade: "", section: "", rollNo: "" });
            queryClient.invalidateQueries({ queryKey: ['students-roster'] });
            toast.success("Student added successfully!");
        }
    });

    const updateStudentMutation = useMutation({
        mutationFn: async (data: any) => {
            const res = await api.put(`/students/${currentStudent.id}`, data);
            return res.data;
        },
        onSuccess: () => {
            setIsEditOpen(false);
            setCurrentStudent(null);
            setFormData({ name: "", email: "", grade: "", section: "", rollNo: "" });
            queryClient.invalidateQueries({ queryKey: ['students-roster'] });
            toast.success("Student updated successfully!");
        }
    });

    const deleteStudentMutation = useMutation({
        mutationFn: async (id: string) => {
            await api.delete(`/students/${id}`);
        },
        onSuccess: () => {
            setIsDeleteOpen(false);
            setCurrentStudent(null);
            queryClient.invalidateQueries({ queryKey: ['students-roster'] });
            toast.success("Student removed successfully.");
        }
    });

    const emailMutation = useMutation({
        mutationFn: async (data: any) => {
            const res = await api.post('/messages/email', data);
            return res.data;
        },
        onSuccess: () => {
            setIsEmailOpen(false);
            setCurrentStudent(null);
            setEmailData({ subject: "", body: "" });
            toast.success("Email sent to parent successfully!");
        }
    });

    const openEdit = (student: any) => {
        setCurrentStudent(student);
        setFormData({
            name: student.name,
            email: student.email,
            grade: student.grade.toString(),
            section: student.section,
            rollNo: student.rollNo ? student.rollNo.toString() : ""
        });
        setIsEditOpen(true);
    };

    const openDelete = (student: any) => {
        setCurrentStudent(student);
        setIsDeleteOpen(true);
    };

    const openEmail = (student: any) => {
        setCurrentStudent(student);
        setEmailData({ subject: "", body: "" });
        setIsEmailOpen(true);
    };

    const filteredStudents = students ? students.filter((s: any) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.email.toLowerCase().includes(searchQuery.toLowerCase())
    ) : [];

    if (isLoading) return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-indigo-500" /></div>;

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 font-display">Student Roster</h2>
                    <p className="text-slate-500 font-medium">Manage your students and track their performance</p>
                </div>
                <div className="flex gap-3">
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <Input
                            placeholder="Search students..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 w-64 bg-white border-slate-200 h-11 rounded-xl"
                        />
                    </div>
                    <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                        <DialogTrigger asChild>
                            <Button className="h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl px-6 shadow-lg shadow-indigo-100">
                                <Plus className="w-5 h-5 mr-2" />
                                Add Student
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add New Student</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label>Full Name</Label>
                                    <Input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. Rahul Sharma" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Email</Label>
                                    <Input value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="student@school.com" />
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label>Grade</Label>
                                        <Input value={formData.grade} onChange={e => setFormData({ ...formData, grade: e.target.value })} placeholder="10" type="number" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Section</Label>
                                        <Input value={formData.section} onChange={e => setFormData({ ...formData, section: e.target.value })} placeholder="A" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Roll No</Label>
                                        <Input value={formData.rollNo} onChange={e => setFormData({ ...formData, rollNo: e.target.value })} placeholder="101" type="number" />
                                    </div>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button variant="ghost" onClick={() => setIsAddOpen(false)}>Cancel</Button>
                                <Button
                                    onClick={() => addStudentMutation.mutate(formData)}
                                    disabled={!formData.name || !formData.grade || addStudentMutation.isPending}
                                    className="bg-indigo-600 font-bold"
                                >
                                    {addStudentMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                    Create Student
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    {/* Edit Student Dialog */}
                    <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Edit Student Details</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label>Full Name</Label>
                                    <Input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Email</Label>
                                    <Input value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label>Grade</Label>
                                        <Input value={formData.grade} onChange={e => setFormData({ ...formData, grade: e.target.value })} type="number" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Section</Label>
                                        <Input value={formData.section} onChange={e => setFormData({ ...formData, section: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Roll No</Label>
                                        <Input value={formData.rollNo} onChange={e => setFormData({ ...formData, rollNo: e.target.value })} type="number" />
                                    </div>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button variant="ghost" onClick={() => setIsEditOpen(false)}>Cancel</Button>
                                <Button
                                    onClick={() => updateStudentMutation.mutate(formData)}
                                    disabled={!formData.name || updateStudentMutation.isPending}
                                    className="bg-indigo-600 text-white font-bold"
                                >
                                    {updateStudentMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                    Update Student
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    {/* Delete Confirmation Dialog */}
                    <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Remove Student?</DialogTitle>
                                <DialogDescription>
                                    Are you sure you want to remove <strong>{currentStudent?.name}</strong> from the roster? This action cannot be undone.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <Button variant="ghost" onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
                                <Button
                                    onClick={() => deleteStudentMutation.mutate(currentStudent.id)}
                                    disabled={deleteStudentMutation.isPending}
                                    className="bg-red-600 hover:bg-red-700 text-white font-bold"
                                >
                                    {deleteStudentMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                    Remove Student
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    {/* Send Email Dialog */}
                    <Dialog open={isEmailOpen} onOpenChange={setIsEmailOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Send Email to {currentStudent?.name}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label>To</Label>
                                    <Input value={currentStudent?.email || "No email registered"} disabled className="bg-slate-50" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Subject</Label>
                                    <Input
                                        value={emailData.subject}
                                        onChange={e => setEmailData({ ...emailData, subject: e.target.value })}
                                        placeholder="Regarding attendance/progress..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Message</Label>
                                    <Textarea
                                        value={emailData.body}
                                        onChange={e => setEmailData({ ...emailData, body: e.target.value })}
                                        placeholder="Type your message here..."
                                        className="h-32 resize-none"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button variant="ghost" onClick={() => setIsEmailOpen(false)}>Cancel</Button>
                                <Button
                                    onClick={() => emailMutation.mutate({ parentId: currentStudent?.id, ...emailData })}
                                    disabled={!emailData.subject || !emailData.body || emailMutation.isPending}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
                                >
                                    {emailMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
                                    Send Email
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <Card className="border-none shadow-sm bg-white overflow-hidden min-h-[500px]">
                <div className="overflow-x-auto">
                    {isLoading ? (
                        <div className="flex justify-center p-12">
                            <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
                        </div>
                    ) : (
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b border-slate-100">
                                <tr>
                                    <th className="px-6 py-4 font-bold text-slate-700 text-sm">Student</th>
                                    <th className="px-6 py-4 font-bold text-slate-700 text-sm">Class</th>
                                    <th className="px-6 py-4 font-bold text-slate-700 text-sm">Avg. Performance</th>
                                    <th className="px-6 py-4 font-bold text-slate-700 text-sm">Attendance</th>
                                    <th className="px-6 py-4 font-bold text-slate-700 text-sm text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredStudents.map((student: any) => (
                                    <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="w-10 h-10 border-2 border-white shadow-sm">
                                                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`} />
                                                    <AvatarFallback>{student.name[0]}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="font-bold text-slate-900">{student.name}</div>
                                                    <div className="text-xs text-slate-500">{student.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-slate-600">Grade {student.grade}-{student.section}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 font-bold text-amber-500">
                                                {student.avgPerformance}%
                                                {student.avgPerformance >= 50 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold capitalize
                                                ${student.lastAttendance === 'PRESENT' ? 'bg-emerald-100 text-emerald-700' :
                                                    student.lastAttendance === 'ABSENT' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-600'}`}>
                                                {student.lastAttendance}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button size="sm" variant="ghost" onClick={() => openEmail(student)} className="h-8 w-8 p-0 text-slate-400 hover:text-indigo-600">
                                                    <Mail className="w-4 h-4" />
                                                </Button>
                                                <Button size="sm" variant="ghost" onClick={() => openEdit(student)} className="h-8 w-8 p-0 text-slate-400 hover:text-indigo-600">
                                                    <Pencil className="w-4 h-4" />
                                                </Button>
                                                <Button size="sm" variant="ghost" onClick={() => openDelete(student)} className="h-8 w-8 p-0 text-slate-400 hover:text-red-600">
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </Card>
        </div>
    );
}
