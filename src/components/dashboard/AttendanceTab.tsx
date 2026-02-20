import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, X, Loader2, Save, Users, Calendar, Plus, Search, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function AttendanceTab() {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [attendance, setAttendance] = useState<Record<string, 'PRESENT' | 'ABSENT'>>({});
    const [selectedGrade, setSelectedGrade] = useState("10");
    const [selectedSection, setSelectedSection] = useState("A");

    // Add/Edit Student State
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [currentStudent, setCurrentStudent] = useState<any>(null);
    const [formData, setFormData] = useState({ name: "", email: "", rollNo: "" });
    const queryClient = useQueryClient();

    // State for History View
    const [viewMode, setViewMode] = useState<'daily' | 'history'>('daily');

    const { data: students, isLoading } = useQuery({
        queryKey: ['students-class', selectedGrade, selectedSection],
        queryFn: async () => {
            const res = await api.get(`/students?grade=${selectedGrade}&section=${selectedSection}`);
            return res.data;
        }
    });

    // Fetch existing attendance for the selected date
    const { data: existingAttendance } = useQuery({
        queryKey: ['attendance', selectedGrade, selectedSection, date],
        queryFn: async () => {
            const res = await api.get('/attendance/history', {
                params: {
                    classId: `class-${selectedGrade}-${selectedSection}`,
                    startDate: date,
                    endDate: date
                }
            });
            return res.data;
        },
    });

    // Effect to populate attendance state when date changes or data loads
    const [isAttendanceLoaded, setIsAttendanceLoaded] = useState(false);
    if (existingAttendance && existingAttendance.length > 0 && !isAttendanceLoaded) {
        const initialState: Record<string, 'PRESENT' | 'ABSENT'> = {};
        existingAttendance.forEach((record: any) => {
            initialState[record.studentId] = record.status;
        });
        setAttendance(initialState);
        setIsAttendanceLoaded(true);
    }

    // Reset loaded state when date changes
    if (existingAttendance && existingAttendance.length === 0 && isAttendanceLoaded) {
        setAttendance({});
        setIsAttendanceLoaded(false);
    }

    const markMutation = useMutation({
        mutationFn: async (data: any) => {
            const res = await api.post('/attendance/mark', data);
            return res.data;
        },
        onSuccess: () => {
            toast.success("Attendance saved to database!");
            queryClient.invalidateQueries({ queryKey: ['attendance'] });
        },
        onError: () => {
            toast.error("Failed to save attendance.");
        }
    });

    const addStudentMutation = useMutation({
        mutationFn: async (data: any) => {
            const payload = {
                ...data,
                grade: selectedGrade,
                section: selectedSection
            };
            const res = await api.post('/students', payload);
            return res.data;
        },
        onSuccess: () => {
            setIsAddOpen(false);
            setFormData({ name: "", email: "", rollNo: "" });
            queryClient.invalidateQueries({ queryKey: ['students-class'] });
            toast.success("Student added to class successfully!");
        }
    });

    const updateStudentMutation = useMutation({
        mutationFn: async (data: any) => {
            const payload = {
                ...data,
                grade: selectedGrade,
                section: selectedSection
            };
            const res = await api.put(`/students/${currentStudent.id}`, payload);
            return res.data;
        },
        onSuccess: () => {
            setIsEditOpen(false);
            setCurrentStudent(null);
            setFormData({ name: "", email: "", rollNo: "" });
            queryClient.invalidateQueries({ queryKey: ['students-class'] });
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
            queryClient.invalidateQueries({ queryKey: ['students-class'] });
            toast.success("Student removed from class.");
        }
    });

    const toggleAttendance = (studentId: string) => {
        setAttendance(prev => ({
            ...prev,
            [studentId]: prev[studentId] === 'PRESENT' ? 'ABSENT' : 'PRESENT'
        }));
    };

    const handleSave = () => {
        const data = {
            date,
            classId: `class-${selectedGrade}-${selectedSection}`,
            grade: selectedGrade,
            section: selectedSection,
            attendanceData: Object.entries(attendance).map(([studentId, status]) => ({
                studentId,
                status
            }))
        };
        markMutation.mutate(data);
    };

    const openEdit = (student: any) => {
        setCurrentStudent(student);
        setFormData({
            name: student.user.name,
            email: student.user.email,
            rollNo: student.rollNo.toString()
        });
        setIsEditOpen(true);
    };

    const openDelete = (student: any) => {
        setCurrentStudent(student);
        setIsDeleteOpen(true);
    };

    if (isLoading) return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-indigo-500" /></div>;

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 font-display">Daily Attendance</h2>
                    <p className="text-slate-500 font-medium">Manage presence for Grade {selectedGrade}-{selectedSection}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                        <SelectTrigger className="w-32 bg-white font-bold border-slate-200 h-11">
                            <SelectValue placeholder="Grade" />
                        </SelectTrigger>
                        <SelectContent>
                            {[...Array(12)].map((_, i) => (
                                <SelectItem key={i + 1} value={(i + 1).toString()}>Grade {i + 1}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={selectedSection} onValueChange={setSelectedSection}>
                        <SelectTrigger className="w-24 bg-white font-bold border-slate-200 h-11">
                            <SelectValue placeholder="Sec" />
                        </SelectTrigger>
                        <SelectContent>
                            {['A', 'B', 'C', 'D'].map(sec => (
                                <SelectItem key={sec} value={sec}>Sec {sec}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <div className="h-8 w-px bg-slate-200 mx-2 hidden md:block"></div>

                    <Input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-40 h-11 bg-white border-slate-200 font-bold"
                    />

                    {/* Add Student Dialog */}
                    <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                        <DialogTrigger asChild>
                            <Button className="h-11 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-4 font-bold rounded-xl">
                                <Plus className="w-5 h-5 mr-2" />
                                Add Student
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Student to Grade {selectedGrade}-{selectedSection}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label>Full Name</Label>
                                    <Input
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="e.g. Rahul Sharma"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Roll Number</Label>
                                    <Input
                                        value={formData.rollNo}
                                        onChange={e => setFormData({ ...formData, rollNo: e.target.value })}
                                        placeholder="e.g. 101"
                                        type="number"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Email (Optional)</Label>
                                    <Input
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="student@school.com"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button variant="ghost" onClick={() => setIsAddOpen(false)}>Cancel</Button>
                                <Button
                                    onClick={() => addStudentMutation.mutate(formData)}
                                    disabled={!formData.name || addStudentMutation.isPending}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
                                >
                                    {addStudentMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                    Add to Class
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
                                    <Input
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Roll Number</Label>
                                    <Input
                                        value={formData.rollNo}
                                        onChange={e => setFormData({ ...formData, rollNo: e.target.value })}
                                        type="number"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Email</Label>
                                    <Input
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button variant="ghost" onClick={() => setIsEditOpen(false)}>Cancel</Button>
                                <Button
                                    onClick={() => updateStudentMutation.mutate(formData)}
                                    disabled={!formData.name || updateStudentMutation.isPending}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
                                >
                                    {updateStudentMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                    Update Details
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
                                    Are you sure you want to remove <strong>{currentStudent?.user.name}</strong> from Grade {selectedGrade}-{selectedSection}? This action cannot be undone.
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

                    <Button
                        onClick={handleSave}
                        disabled={markMutation.isPending}
                        className="h-11 bg-[#4F46E5] hover:bg-[#4338CA] px-6 font-bold rounded-xl shadow-lg shadow-indigo-100"
                    >
                        {markMutation.isPending ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Save className="w-5 h-5 mr-2" />}
                        Save Attendance
                    </Button>
                </div>
            </div>

            <Card className="border-none shadow-sm bg-white overflow-hidden min-h-[400px]">
                <div className="overflow-x-auto">
                    {students && students.length > 0 ? (
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b border-slate-100">
                                <tr>
                                    <th className="px-6 py-4 font-bold text-slate-700 text-sm">Student Name</th>
                                    <th className="px-6 py-4 font-bold text-slate-700 text-sm">Roll No.</th>
                                    <th className="px-6 py-4 font-bold text-slate-700 text-sm text-center">Status</th>
                                    <th className="px-6 py-4 font-bold text-slate-700 text-sm text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {students.map((student: any) => (
                                    <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="w-10 h-10 border-2 border-white shadow-sm">
                                                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${student.user.name}`} />
                                                    <AvatarFallback>{student.user.name[0]}</AvatarFallback>
                                                </Avatar>
                                                <span className="font-bold text-slate-900">{student.user.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-slate-500">#{student.rollNo}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    onClick={() => setAttendance(p => ({ ...p, [student.id]: 'PRESENT' }))}
                                                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${attendance[student.id] === 'PRESENT' ? 'bg-emerald-500 text-white shadow-md scale-110' : 'bg-slate-50 text-slate-300 hover:bg-slate-100'}`}
                                                >
                                                    <Check className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => setAttendance(p => ({ ...p, [student.id]: 'ABSENT' }))}
                                                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${attendance[student.id] === 'ABSENT' ? 'bg-red-500 text-white shadow-md scale-110' : 'bg-slate-50 text-slate-300 hover:bg-slate-100'}`}
                                                >
                                                    <X className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
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
                    ) : (
                        <div className="flex flex-col items-center justify-center h-96 text-center p-8">
                            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                                <Users className="w-10 h-10 text-slate-300" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">No students found</h3>
                            <p className="text-slate-500 max-w-sm mb-6">
                                There are no students in Grade {selectedGrade}-{selectedSection} yet. Add students to start marking attendance.
                            </p>
                            <Button
                                onClick={() => setIsAddOpen(true)}
                                className="bg-indigo-600 text-white font-bold rounded-xl"
                            >
                                <Plus className="w-5 h-5 mr-2" />
                                Add First Student
                            </Button>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
}
