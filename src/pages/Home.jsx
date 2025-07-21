
import Banner from '../component/Banner';
import BookingProcess from '../component/BookingProcess';
import FaqSection from '../component/FaqSection';
import HappyClients from '../component/HappyClients';
import MobileAppComingSoon from '../component/MobileAppComingSoon';
import RecentListing from '../component/RecentListing';
import SpecialOffer from '../component/SpecialOffer';
import TrustedPartners from '../component/TrustedPartners';
import WhyChooseUs from '../component/WhyChooseUs';
import { Helmet } from "react-helmet-async";

const Home = () => {
    return (
        <div>
            
            <Helmet>
                <title>Home | Renthox</title>
                <meta name="description" content="Explore our latest car listings, special offers, and trusted partners on DriveEase." />
            </Helmet>
            <Banner></Banner>
            <RecentListing></RecentListing>
            <BookingProcess></BookingProcess>
            <SpecialOffer></SpecialOffer>
            <WhyChooseUs></WhyChooseUs>
            <HappyClients></HappyClients>
            <FaqSection></FaqSection>
            <MobileAppComingSoon></MobileAppComingSoon>
            <TrustedPartners></TrustedPartners>
        </div>
    );
};

export default Home;