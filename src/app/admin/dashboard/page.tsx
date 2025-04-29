"use client";

import React, { useEffect, useState } from 'react';
import {
  FiUsers,
  FiTrendingUp,
  FiBox,
  FiGrid,
  FiActivity,
  FiCalendar,
  FiClock,
  FiMail
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

interface DashboardStats {
  totalProducts: number;
  totalCategories: number;
  totalContacts: number;
  totalSubscribers: number;
}

interface RecentActivity {
  id: string;
  action: string;
  subject: string;
  time: string;
  icon: any;
  color: string;
}

// No changes needed to imports or interfaces

export default function Dashboard() {
  // Existing state declarations remain unchanged
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalCategories: 0,
    totalContacts: 0,
    totalSubscribers: 0
  });
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  // Add new state for user stats
  const [userStats, setUserStats] = useState({
    newUsers: 0,
    userGrowth: 0,
    subscriberGrowth: 0
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Create an array of fetch promises
        const fetchPromises = [
          fetch('/api/products').then(res => res.ok ? res.json() : []),
          fetch('/api/categories').then(res => res.ok ? res.json() : []),
          fetch('/api/contact').then(res => res.ok ? res.json() : [])
        ];

        // Try to fetch newsletter subscribers, but don't fail if endpoint doesn't exist
        let subscribers = [];
        try {
          const subscribersRes = await fetch('/api/newsletter');
          if (subscribersRes.ok) {
            subscribers = await subscribersRes.json();
          }
        } catch (error) {
          console.warn('Newsletter API not available:', error);
        }

        // Fetch dashboard stats from our new endpoint
        let dashboardStats = {
          newUsers: { count: 0, growthPercentage: '0' },
          subscribers: { total: 0, growthPercentage: '0' }
        };

        try {
          const statsRes = await fetch('/api/dashboard/stats');
          if (statsRes.ok) {
            const dashboardStats = await statsRes.json();
            console.log('Dashboard stats response:', dashboardStats);

            // Update user stats with proper fallbacks
            setUserStats({
              newUsers: dashboardStats.newUsers?.count || 0,
              userGrowth: parseFloat(dashboardStats.newUsers?.growthPercentage || '0'),
              subscriberGrowth: parseFloat(dashboardStats.subscribers?.growthPercentage || '0')
            });
          }
        } catch (error) {
          console.warn('Dashboard stats API not available:', error);
        }

        // Wait for all primary fetch operations to complete
        const [products, categories, contacts] = await Promise.all(fetchPromises);

        // Update stats with fallbacks to prevent NaN
        setStats({
          totalProducts: Array.isArray(products) ? products.length : 0,
          totalCategories: Array.isArray(categories) ? categories.length : 0,
          totalContacts: Array.isArray(contacts) ? contacts.length : 0,
          totalSubscribers: Array.isArray(subscribers) ? subscribers.length : dashboardStats.subscribers?.total || 0
        });

        // Create recent activities from the latest data
        const activities: RecentActivity[] = [];

        // Add product activities if products exist and have required properties
        if (Array.isArray(products) && products.length > 0) {
          const productActivities = products
            .filter(product => product && product._id && product.title && product.createdAt)
            .slice(0, 2)
            .map((product: any) => ({
              id: product._id,
              action: 'New product added',
              subject: product.title,
              time: new Date(product.createdAt).toLocaleDateString(),
              icon: FiBox,
              color: 'bg-blue-100 text-blue-600'
            }));
          activities.push(...productActivities);
        }

        // Add contact activities if contacts exist and have required properties
        if (Array.isArray(contacts) && contacts.length > 0) {
          const contactActivities = contacts
            .filter(contact => contact && contact._id && contact.name && contact.createdAt)
            .slice(0, 2)
            .map((contact: any) => ({
              id: contact._id,
              action: 'New contact message',
              subject: `From ${contact.name}`,
              time: new Date(contact.createdAt).toLocaleDateString(),
              icon: FiMail,
              color: 'bg-green-100 text-green-600'
            }));
          activities.push(...contactActivities);
        }

        // Sort activities by date (newest first)
        activities.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
        setRecentActivities(activities);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error('Failed to load some dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statsConfig = [
    {
      title: 'Total Products',
      value: stats.totalProducts.toLocaleString(),
      icon: FiBox,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Categories',
      value: stats.totalCategories.toLocaleString(),
      icon: FiGrid,
      color: 'from-emerald-500 to-green-600'
    },
    {
      title: 'Contact Messages',
      value: stats.totalContacts.toLocaleString(),
      icon: FiMail,
      color: 'from-indigo-500 to-purple-600'
    },
    {
      title: 'Subscribers',
      value: stats.totalSubscribers.toLocaleString(),
      icon: FiUsers,
      color: 'from-amber-500 to-yellow-600'
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
        <div className="flex items-center space-x-3 text-sm">
          <FiCalendar className="text-gray-500" />
          <span className="text-gray-600">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsConfig.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
            >
              <div className={`h-2 bg-gradient-to-r ${stat.color}`}></div>
              <div className="p-6">
                <div className="flex items-center">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} text-white mr-4`}>
                    <Icon className="text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">{stat.title}</p>
                    <p className="text-2xl font-semibold">{stat.value}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-xl shadow-md lg:col-span-2"
        >
          <h2 className="text-lg font-semibold mb-6 flex items-center">
            <FiActivity className="mr-2 text-blue-600" />
            <span>Recent Activity</span>
          </h2>
          <div className="space-y-5">
            {recentActivities.length > 0 ? (
              recentActivities.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.id} className="flex items-start p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                    <div className={`w-10 h-10 rounded-full ${item.color} flex items-center justify-center mr-4 flex-shrink-0`}>
                      <Icon />
                    </div>
                    <div className="flex-grow">
                      <p className="font-medium text-gray-900">{item.action}</p>
                      <p className="text-sm text-gray-600">{item.subject}</p>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <FiClock className="mr-1" />
                      {item.time}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-gray-500">
                No recent activities to display
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <h2 className="text-lg font-semibold mb-6 flex items-center">
            <FiUsers className="mr-2 text-green-600" />
            <span>Quick Stats</span>
          </h2>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-100 rounded-lg p-4">
                <div className="text-sm text-gray-600">Total Products</div>
                <div className="text-2xl font-bold text-gray-800 mt-1">{stats.totalProducts}</div>
              </div>
              <div className="bg-gray-100 rounded-lg p-4">
                <div className="text-sm text-gray-600">Total Categories</div>
                <div className="text-2xl font-bold text-gray-800 mt-1">{stats.totalCategories}</div>
              </div>
            </div>

            <div className="bg-gray-100 rounded-lg p-4">
              <div className="text-sm text-gray-600">Subscribers</div>
              <div className="flex justify-between items-end">
                <div className="text-2xl font-bold text-gray-800">{stats.totalSubscribers}</div>
                <div className={`text-xs flex items-center ${userStats.subscriberGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {userStats.subscriberGrowth >= 0 ? (
                    <><FiTrendingUp className="mr-1" /> +{userStats.subscriberGrowth}%</>
                  ) : (
                    <><FiTrendingUp className="mr-1 transform rotate-180" /> {userStats.subscriberGrowth}%</>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}