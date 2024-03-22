import Navbar from "../components/commonUseComponents/Navbar";
import Title from "../components/HotTopicComponents/Title";
import SaleButton from "../components/HotTopicComponents/SaleButton";
import NewsButton from "../components/HotTopicComponents/NewsButton";
import NewsCardDto from "../components/HotTopicComponents/NewsCardDto";
function HotTopic() {

  return (
    <>
      <Navbar />
      <div className="pl-80 w-full" 
      style={{
        backgroundImage: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.05) 100%)',
        height: '100vh'
        
      }}>
      <Title/>
        <div style={{marginTop:'20px',display: 'flex', gap: '20px'}}>
          <NewsButton></NewsButton>
          <SaleButton></SaleButton>
        </div>
        <div>
          <NewsCardDto></NewsCardDto>
        </div>

      </div>
      
    </>
  );
}
export default HotTopic;