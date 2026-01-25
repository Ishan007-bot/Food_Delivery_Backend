import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Shield,
  UserPlus,
  Mail,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'moderator';
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  avatar?: string;
}

const mockUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'active', createdAt: '2024-01-15' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'user', status: 'active', createdAt: '2024-01-16' },
  { id: '3', name: 'Bob Wilson', email: 'bob@example.com', role: 'moderator', status: 'active', createdAt: '2024-01-17' },
  { id: '4', name: 'Alice Brown', email: 'alice@example.com', role: 'user', status: 'inactive', createdAt: '2024-01-18' },
  { id: '5', name: 'Charlie Davis', email: 'charlie@example.com', role: 'user', status: 'pending', createdAt: '2024-01-19' },
  { id: '6', name: 'Diana Miller', email: 'diana@example.com', role: 'user', status: 'active', createdAt: '2024-01-20' },
  { id: '7', name: 'Edward Lee', email: 'edward@example.com', role: 'moderator', status: 'active', createdAt: '2024-01-21' },
  { id: '8', name: 'Fiona Garcia', email: 'fiona@example.com', role: 'user', status: 'active', createdAt: '2024-01-22' },
];

const roleColors: Record<string, 'default' | 'secondary' | 'gradient'> = {
  admin: 'gradient',
  moderator: 'default',
  user: 'secondary',
};

const statusColors: Record<string, 'success' | 'warning' | 'destructive'> = {
  active: 'success',
  pending: 'warning',
  inactive: 'destructive',
};

export default function Users() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">User Management</h1>
            <p className="text-muted-foreground mt-1">
              Manage user accounts and permissions
            </p>
          </div>
          <Button variant="hero">
            <UserPlus className="mr-2 h-4 w-4" />
            Invite User
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card variant="stat">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Total Users</p>
              <p className="text-3xl font-bold">{mockUsers.length}</p>
            </CardContent>
          </Card>
          <Card variant="success">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Active</p>
              <p className="text-3xl font-bold">{mockUsers.filter((u) => u.status === 'active').length}</p>
            </CardContent>
          </Card>
          <Card variant="warning">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-3xl font-bold">{mockUsers.filter((u) => u.status === 'pending').length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle>All Users</CardTitle>
                <CardDescription>{filteredUsers.length} users found</CardDescription>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback className="bg-primary/10 text-primary text-sm">
                            {getInitials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={roleColors[user.role]} className="capitalize">
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusColors[user.status]} className="capitalize">
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{user.createdAt}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Shield className="mr-2 h-4 w-4" />
                            Change Role
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-muted-foreground">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
                {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of{' '}
                {filteredUsers.length} users
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </DashboardLayout>
  );
}
