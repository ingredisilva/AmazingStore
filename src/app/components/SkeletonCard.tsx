import styled from "styled-components";

const SkeletonCard = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(93, 93, 93, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  transition: transform 0.2s ease-in-out;
  width: 100%;
  height: 300px;
  gap: 10px;
`;

const SkeletonImage = styled.div`
  width: 250px;
  height: 250px;
  background-color: #e0e0e0;
  border-radius: 10px;
`;

const SkeletonText = styled.div`
  width: 100%;
  height: 20px;
  background-color: #e0e0e0;
  border-radius: 5px;
`;

const SkeletonPrice = styled(SkeletonText)`
  width: 60%;
`;

export default function SkeletonProductCard() {
  return (
    <SkeletonCard>
      <SkeletonImage />
      <SkeletonText />
      <SkeletonPrice />
    </SkeletonCard>
  );
}
