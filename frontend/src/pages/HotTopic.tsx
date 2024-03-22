import Navbar from "../components/commonUseComponents/Navbar";
import Title from "../components/HotTopicComponents/Title";
import SaleButton from "../components/HotTopicComponents/SaleButton";
import NewsButton from "../components/HotTopicComponents/NewsButton";
import NewsCard from "../components/HotTopicComponents/NewsCard";
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
        <div style={{marginTop:'30px',display: 'flex', gap: '20px'}}>
        
          <NewsCard
            hotTopicLink="https://www.gamemeca.com/view.php?gid=1660495"
            hotTopicImg="https://cdn.gamemeca.com/gmdata/0001/660/495/gm167008_20210525shg7.jpg"
            hotTopicTitle="J.J. 에이브람스 “포탈 영화 각본 제작 중”"
            hotTopicShortDesc="국내 영화팬들에게 ‘쌍제이’라는 별명으로 유명한 영화감독 J.J. 에이브람스가 밸브 대표작 ‘포탈’ 기반 영화 근황을 전했다. 영화 제작이 공식적으로 발표된 지 무려 5년 만이다. J.J. 에이브람스는 25일, 해외 매체 IGN과 인터뷰에서 “현재 워너브라더스에서 포탈 영화 각본을 제작 중이다”며, “마침내 궤도에 오른 듯한 느낌이다”라고 말했다. 이어 포탈 영화는 원작의 제한된 내러티브 덕분에 스토리텔링에 엄청난 잠재력을 지니고 있다고 덧붙였다"
            hotTopicDate={new Date('2021-05-25')}
          ></NewsCard>
        </div>

      </div>
      
    </>
  );
}
export default HotTopic;