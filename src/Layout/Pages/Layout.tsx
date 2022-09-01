import { Space } from '@mantine/core';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Modules/Footer';
import HeaderNavigation from '../Modules/HeaderNavigation';

interface FooterLinksProps {
  data: {
    title: string;
    links: { label: string; link: string }[];
  }[];
}

const dataFooter = [
  {
    title: 'About',
    links: [
      {
        label: 'Feature',
        link: '/',
      },
      {
        label: 'Pricing',
        link: '/',
      },
      {
        label: 'Support',
        link: '/',
      },
      {
        label: 'Forums',
        link: '/',
      },
    ],
  },
  {
    title: 'Project',
    links: [
      {
        label: 'Contribute',
        link: '/',
      },
      {
        label: 'Media access',
        link: '/',
      },
      {
        label: 'Changelog',
        link: '/',
      },
      {
        label: 'Releases',
        link: '/',
      },
    ],
  },
  {
    title: 'Community',
    links: [
      {
        label: 'Join Discord',
        link: '/',
      },
      {
        label: 'Follow Twitter',
        link: '/',
      },
      {
        label: 'Email newsletter',
        link: '/',
      },
      {
        label: 'Github discussion',
        link: '/',
      },
    ],
  },
];

const linksHeader = [
  {
    link: '/',
    label: 'Trang chủ',
  },
  {
    link: '/',
    label: 'Lịch chiếu',
  },
  {
    link: '/',
    label: 'Tin tức',
  },
  {
    link: '/',
    label: 'Ứng dụng',
  },
  {
    link: '/',
    label: 'Về chúng tôi',
  },
];

const Layout = () => {
  return (
    <>
      <Space h={80} />
      <HeaderNavigation links={linksHeader} />
      <Outlet />
      <Footer data={dataFooter} />
    </>
  );
};

export default Layout;
