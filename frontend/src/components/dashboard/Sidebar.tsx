import { useLocation, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  FileText,
  Upload,
  BarChart3,
  Settings,
  Mail,
  Globe,
  Shield,
  ChevronDown,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useAuth } from '@/contexts/AuthContext';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

const mainNavItems = [
  { title: 'Pass', url: '/dashboard', icon: LayoutDashboard, note: 'overview' },
  { title: 'Service', url: '/dashboard/analytics', icon: BarChart3, note: 'analytics' },
];

const adminNavItems = [
  { title: 'Guests', url: '/dashboard/users', icon: Users, note: 'users' },
  { title: 'Throttle', url: '/dashboard/rate-limits', icon: Shield, note: 'rate-limits' },
];

const dataNavItems = [
  { title: 'Ticket Book', url: '/dashboard/records', icon: FileText, note: 'records' },
  { title: 'Mise en Place', url: '/dashboard/files', icon: Upload, note: 'uploads' },
];

const integrationNavItems = [
  { title: 'Couriers', url: '/dashboard/email', icon: Mail, note: 'email' },
  { title: 'Suppliers', url: '/dashboard/integrations', icon: Globe, note: 'apis' },
];

export function DashboardSidebar() {
  const location = useLocation();
  const { user } = useAuth();
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';
  const isAdmin = user?.role === 'admin';

  const isActive = (url: string) => location.pathname === url;

  const NavItem = ({ item }: { item: typeof mainNavItems[number] }) => (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={isActive(item.url)}
        tooltip={isCollapsed ? item.title : undefined}
        className="font-display text-base data-[active=true]:bg-sidebar-primary/15 data-[active=true]:text-sidebar-primary-foreground data-[active=true]:before:content-['•'] data-[active=true]:before:text-primary data-[active=true]:before:absolute data-[active=true]:before:-left-0 data-[active=true]:before:text-2xl relative"
      >
        <Link to={item.url}>
          <item.icon className="h-4 w-4" />
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border p-5">
        <Link to="/dashboard" className="flex items-baseline gap-2">
          <span className="text-primary font-display text-2xl leading-none">●</span>
          {!isCollapsed && (
            <span className="font-display text-xl font-medium tracking-tight text-sidebar-foreground">
              Food<span className="italic font-light">Mood</span>
            </span>
          )}
        </Link>
        {!isCollapsed && (
          <div className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-sidebar-foreground/55 mt-2">
            The Pass · Vol. I
          </div>
        )}
      </SidebarHeader>

      <SidebarContent className="px-1">
        <SidebarGroup>
          <SidebarGroupLabel className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-sidebar-foreground/55">
            § Service
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <NavItem key={item.url} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {isAdmin && (
          <SidebarGroup>
            <Collapsible defaultOpen className="group/collapsible">
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger className="flex w-full items-center justify-between font-mono text-[0.6rem] uppercase tracking-[0.22em] text-sidebar-foreground/55">
                  § The Kitchen
                  <ChevronDown className="h-3 w-3 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {adminNavItems.map((item) => (
                      <NavItem key={item.url} item={item} />
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroup>
        )}

        <SidebarGroup>
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center justify-between font-mono text-[0.6rem] uppercase tracking-[0.22em] text-sidebar-foreground/55">
                § Tickets
                <ChevronDown className="h-3 w-3 transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {dataNavItems.map((item) => (
                    <NavItem key={item.url} item={item} />
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        <SidebarGroup>
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center justify-between font-mono text-[0.6rem] uppercase tracking-[0.22em] text-sidebar-foreground/55">
                § The Pass-Out
                <ChevronDown className="h-3 w-3 transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {integrationNavItems.map((item) => (
                    <NavItem key={item.url} item={item} />
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip={isCollapsed ? 'Settings' : undefined} className="font-display text-base">
              <Link to="/dashboard/settings">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        {!isCollapsed && (
          <div className="mt-3 px-2 py-2 border-t border-sidebar-border/60 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-sidebar-foreground/45">
            Folio {Math.floor(Math.random() * 90 + 10)} · {new Date().toLocaleDateString('en-GB')}
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
