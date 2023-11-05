import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FieldDataType } from '../../../types/FieldType';
import ResetIcon from '../../../assets/icon/reset_white.png';
import CustomMapMarker from './CustomMapMarker';
import alertModal from '../../common/alertModal';
import FeildSearch from '../../search/FieldSearch';

interface FieldMapType {
  searchKeyword: string;
  totalDomData: FieldDataType[];
  setSortedDomData: React.Dispatch<React.SetStateAction<FieldDataType[]>>;
}

const FieldMap: React.FC<FieldMapType> = ({
  searchKeyword,
  totalDomData,
  setSortedDomData,
}) => {
  const { naver } = window;
  var map: naver.maps.Map;
  const navigate = useNavigate();
  const mapElement = useRef<HTMLDivElement | null>(null);
  const [newMap, setNewMap] = useState<naver.maps.Map | null>(null);
  const [AddressX, setAddressX] = useState<number>(0);
  const [AddressY, setAddressY] = useState<number>(0);
  const createMarkerList: naver.maps.Marker[] = [];
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  //검색 키워드에 따라 해당 위치의 위경도 상태 저장!!
  useEffect(() => {
    if (searchKeyword) {
      naver.maps.Service.geocode(
        { query: searchKeyword },
        function (status, res) {
          if (res.v2.addresses.length === 0) {
            if (!searchKeyword) {
              return alertModal('검색어를 입력해주세요.', 'warning');
            } else {
              return alertModal('검색어를 입력해주세요.', 'warning');
            }
          } else {
            const resAddress = res.v2.addresses[0];
            const x = Number(resAddress.x);
            const y = Number(resAddress.y);
            setAddressX(x);
            setAddressY(y);
          }
        }
      );
    }
  }, [searchKeyword]);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  //중심이 될 위경도 값 바탕으로 맵 생성하고 마커 생성 함수 호출 !!
  useEffect(() => {
    if (!mapElement.current || !naver) return;

    const center = new naver.maps.LatLng(AddressY, AddressX);
    const mapOptions: naver.maps.MapOptions = {
      center: center,
      zoom: 12,
      minZoom: 11,
      maxZoom: 19,
      zoomControl: true,
      zoomControlOptions: {
        style: naver.maps.ZoomControlStyle.SMALL,
        position: naver.maps.Position.TOP_RIGHT,
      },
      mapDataControl: false,
      scaleControl: false,
    };
    map = new naver.maps.Map(mapElement.current, mapOptions);
    setNewMap(map);
    addMarkers();
    resetListHandler();
  }, [AddressX, AddressY, totalDomData, viewportWidth]);

  //구장 데이터 배열 순회하면서 마커 생성 진행!
  const addMarkers = () => {
    for (let i = 0; i < totalDomData.length; i++) {
      let markerObj = totalDomData[i];
      const { dom_id, title, lat, lng } = markerObj;
      addMarker(dom_id, title, lat, lng);
    }
  };

  //마커 생성 하고 createMarkerList에 추가!!
  const addMarker = (id: string, name: string, lat: number, lng: number) => {
    try {
      let newMarker = new naver.maps.Marker({
        position: new naver.maps.LatLng(lng, lat),
        map,
        title: name,

        clickable: true,
        icon: {
          content: CustomMapMarker({ title: name, windowWidth: viewportWidth }),
          size: new naver.maps.Size(38, 58),
          anchor: new naver.maps.Point(19, 58),
        },
      });
      newMarker.setTitle(name);
      createMarkerList.push(newMarker);
      naver.maps.Event.addListener(newMarker, 'click', () =>
        markerClickHandler(id)
      );
    } catch (e) {}
  };
  useEffect(() => {
    if (newMap) {
      const MoveEventListner = naver.maps.Event.addListener(
        newMap,
        'idle',
        idleHandler
      );
      return () => {
        naver.maps.Event.removeListener(MoveEventListner);
      };
    }
  }, [newMap]);

  const idleHandler = () => {
    updateMarkers(newMap, createMarkerList);
  };

  const updateMarkers = (
    map: naver.maps.Map | null,
    markers: naver.maps.Marker[]
  ) => {
    if (!map) return;
    let mapBounds = map.getBounds();
    let marker: naver.maps.Marker, position;
    for (var i = 0; i < markers.length; i++) {
      marker = markers[i];
      position = marker.getPosition();
      if (mapBounds.hasPoint(position)) {
        showMarker(map, marker);
      } else {
        hideMarker(marker);
      }
    }
  };

  const showMarker = (map: naver.maps.Map, marker: naver.maps.Marker) => {
    if (marker.getMap()) return;
    marker.setMap(map);
  };
  const hideMarker = (marker: naver.maps.Marker) => {
    if (!marker.getMap()) return;
    marker.setMap(null);
  };

  useEffect(() => {
    resetListHandler();
  }, [newMap]);

  const resetListHandler = () => {
    if (!newMap) return;
    const newArray = [...totalDomData].sort((a, b) => {
      const currentCenterLatLng = newMap.getCenter();
      const DomLatLngA = new naver.maps.LatLng(a.lng, a.lat);
      const DomLatLngB = new naver.maps.LatLng(b.lng, b.lat);
      const projection = newMap.getProjection();
      const distanceA = projection.getDistance(currentCenterLatLng, DomLatLngA);
      const distanceB = projection.getDistance(currentCenterLatLng, DomLatLngB);

      if (distanceA < distanceB) return -1;
      else if (distanceA > distanceB) return 1;
      else return 0;
    });

    setSortedDomData(newArray);
  };

  const markerClickHandler = (id: string) => {
    navigate(`/ground/${id}`);
  };

  return (
    <StyledMapContainer>
      <FeildSearch />
      <StyledMap id="map" ref={mapElement}></StyledMap>
      <StyledButton onClick={() => resetListHandler()}>
        <StyledButtonIcon>
          <img src={ResetIcon} alt="" />
        </StyledButtonIcon>
        <StyledButtonContent>현 위치에서 검색</StyledButtonContent>
      </StyledButton>
    </StyledMapContainer>
  );
};

export default FieldMap;

const StyledMapContainer = styled.div`
  position: relative;
`;

const StyledMap = styled.div`
  width: 100%;
  height: 47rem;
  margin: 0 auto;
`;
const StyledButton = styled.div`
  position: absolute;
  display: table;
  padding: 0.7rem 0.2rem;
  table-layout: auto;
  border-radius: 2.3rem;
  background-color: var(--color--darkgreen);
  z-index: 10;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  @media (min-width: 768px) {
    padding: 1rem 0.8rem;
    bottom: 4rem;
  }
`;

const StyledButtonIcon = styled.div`
  display: table-cell;
  display: inline-block;
  width: 2rem;
  height: 2em;
  margin-left: 0.7rem;
  @media (min-width: 768px) {
    width: 2.7rem;
    height: 2.7rem;
    padding-top: 0.2rem;
  }
`;

const StyledButtonContent = styled.div`
  max-width: 17rem;
  /* height: 2rem; */
  padding: 0 1.5rem 0 0.8rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: table-cell;
  vertical-align: middle;
  cursor: pointer;
  color: white;
  font-size: 1.3rem;
  letter-spacing: -0.04rem;
  font-weight: 600;
  line-height: 2rem;
  @media (min-width: 768px) {
    height: 3rem;
    font-size: 1.7rem;
    line-height: 3rem;
  }
`;
