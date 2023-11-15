// eslint-disable-next-line jsx-a11y/anchor-is-valid
import React from 'react';
import { useLocation } from 'react-router-dom';
import HomepageHeader from './HomepageHeader';
import OtherPagesHeader from './OtherPagesHeader';

const Header = () => {
  const location = useLocation();

  // Define an array of routes where the banner should be displayed
  const routesWithHomepageBanner = ['/', '/home'];

  // Define an array of routes and their corresponding customizations
  const routesWithCustomizations = [
    {
      route: '/about',
      heading: 'About Page Heading...',
      description: 'Custom description for the About page.',
      showBanner: true,
    },
    {
      route: '/verify',
      heading: 'Verify Page Heading...',
      description: 'Custom description for the Verify page.',
      showBanner: true,
    },
    {
      route: '/certificates',
      heading: 'Certificates Page Heading...',
      description: 'Custom description for the Certificates page.',
      showBanner: false,
    },
    {
      route: '/new-certificate',
      heading: 'New Certificate Page Heading...',
      description: 'Custom description for the New Certificate page.',
      showBanner: false,
    },
  ];

  // Find the customization for the current route, if available
  const currentRouteCustomization = routesWithCustomizations.find(
    (customization) => customization.route.toLowerCase() === location.pathname.toLowerCase()
  );

  // If no customization is found, use default values
  const { heading: heading1 = 'Default Page Heading', description: description1 = 'Default description.', showBanner = false } = currentRouteCustomization || {};

  return (
    <header className={`nk-header page-header ${routesWithHomepageBanner.includes(location.pathname) ? 'is-transparent' : ''} is-sticky is-shrink`} id="header">
      {routesWithHomepageBanner.includes(location.pathname) ? <HomepageHeader /> : <OtherPagesHeader heading={heading1} description={description1} showBanner={showBanner} />}
    </header>
  );
};

export default Header;
