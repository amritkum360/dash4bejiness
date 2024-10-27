import AboutSection from "./comp/AboutSection/AboutSection";
import AboutUs2 from "./comp/AboutUs2/AboutUs2";
import CategorySection from "./comp/CategorySection/CategorySection";
import Certificates from "./comp/Certificates/Certificates";
import CompanyImg from "./comp/CompanyImg/CompanyImg2";
import Header from "./comp/Header/Header";
import HotSales from "./comp/HotSales/HotSales";
import Nav from "./comp/Nav/Nav";
import ProductShowcase from "./comp/ReadyToShipSection/ReadyToShipSection";
import TopPick from "./comp/TopPick/TopPick";

export default function EditMainPage(){
    return(
        <>
        <Header />
        <Nav />
        <AboutSection />
        <CategorySection />
        <HotSales />
        <AboutUs2 />
        <CompanyImg />
        <Certificates />
        {/* <ProductShowcase /> */}
        <TopPick />
        </>
    )
}