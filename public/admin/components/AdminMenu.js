(function() {
    window.AdminMenu = ({ selectedKey }) => {
        const { Menu } = antd;

        return (
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[selectedKey]}>
                <Menu.Item key="1"><a href="/admin">Dashboard</a></Menu.Item>
                <Menu.Item key="2"><a href="/admin/drinks.html">Drinks</a></Menu.Item>
                <Menu.Item key="3"><a href="/admin/categories.html">Categories</a></Menu.Item>
                <Menu.Item key="4"><a href="/admin/intake-forms.html">Intake Forms</a></Menu.Item>
                <Menu.Item key="5"><a href="/admin/services.html">Services</a></Menu.Item>
                <Menu.Item key="6"><a href="/admin/subscriptions.html">Subscriptions</a></Menu.Item>
                <Menu.Item key="7"><a href="/admin/users.html">Users</a></Menu.Item>
            </Menu>
        );
    };
})(); 