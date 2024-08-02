import { forwardRef } from "react";
import styled from "styled-components";
import { useCabins } from "../../features/cabins/useCabins";
import { Button, Spinner } from "../common";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const TextLayer = styled.div`
  display: grid;
  align-items: center;
  font-weight: bold;
  margin: 4rem;
`;

const CabinInfo = styled.div`
  margin: 1rem 0;
  img {
    width: 100%;
    max-width: 600px;
    object-fit: contain;
  }

  h3 {
    margin: 0.5em 0;
  }

  p {
    font-size: 14px;
  }
`;

const RoomSection = forwardRef((props, ref) => {
  const { isLoading, cabins } = useCabins();
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <TextLayer ref={ref}>
      <h1>{t("homePage.roomIntroduction")}</h1>
      {isLoading ? (
        <Spinner />
      ) : (
        cabins.map((cabin) => (
          <div key={cabin.id}>
            <CabinInfo>
              <img src={cabin.image} alt={cabin.name} />
              <h3>{cabin.name}</h3>
              <p>
                容納人數：
                {cabin.maxCapacity === 1 ? "1位" : `1-${cabin.maxCapacity}位`}
              </p>
              <p>{cabin.description}</p>
            </CabinInfo>
            <Button onClick={() => navigate(`/reservation/${cabin.id}`)}>
              進行預約
            </Button>
          </div>
        ))
      )}
    </TextLayer>
  );
});

RoomSection.displayName = "RoomSection";
export default RoomSection;
