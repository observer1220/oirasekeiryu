import styled from "styled-components";
import titleBackground from "../../public/bg-lead-title.jpg";

const TextLayer = styled.div`
  display: flex;
  align-items: center;
  width: 760px;
  font-weight: bold;
  margin: 4rem;

  h1 {
    width: 50%;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    background-image: url(${titleBackground});
  }
`;

function HotelStory() {
  return (
    <TextLayer>
      <h1>
        在溪畔度過
        <br />
        獨一無二的時光
      </h1>
      <p>
        這裡是唯一一間蓋在奧入瀨溪流旁的度假飯店。
        <br />
        <br />
        屬於十和田八幡平國立公園的奧入瀨溪流，有著清澈的溪流與長著青苔的岩石，以及一整片落葉闊葉林。
        <br />
        <br />
        鮮嫩欲滴的綠意、似錦的秋日森林、白雪與冰的世界...
        這裡的景觀美到被指定為特別名勝和天然紀念物。
        <br />
        <br />
        歡迎度過在溪流旁醒來的假日時光。
      </p>
    </TextLayer>
  );
}

export default HotelStory;
