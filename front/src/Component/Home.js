import "./Home.css";
import { useEffect, useState } from "react";
import allsvg from "../static/all.svg";
import midsvg from "../static/mid.svg";
import topsvg from "../static/top.svg";
import bottomsvg from "../static/bot.svg";
import junglesvg from "../static/jung.svg";
import supportsvg from "../static/supp.svg";
import plat from "../static/plat.png";
import champ0 from "../static/champion0.png";
import champ1 from "../static/champion1.png";
import champ2 from "../static/champion2.png";
import champ3 from "../static/champion3.png";
import champ4 from "../static/champion4.png";
import champ5 from "../static/champion5.png";
import queryString from "query-string";
import { useHistory } from "react-router-dom";

export default function Home() {
  const [tier_list, set_tier_list] = useState();
  const [original_list, set_original_list] = useState();
  const [params] = useState(queryString.parse(window.location.search));
  const history = useHistory();
  const tiers = useState([
    "S+",
    "S",
    "S-",
    "A+",
    "A",
    "A-",
    "B+",
    "B",
    "B-",
    "C+",
    "C",
    "C-",
    "D+",
    "D",
    "D-",
  ]);
  const laneImage = useState({
    supportlane: supportsvg,
    junglelane: junglesvg,
    midlane: midsvg,
    toplane: topsvg,
    botlane: bottomsvg,
  });
  const champImage = useState({
    0: champ0,
    1: champ1,
    2: champ2,
    3: champ3,
    4: champ4,
    5: champ5,
  });
  function getList() {
    fetch("/api/getlist")
      .then((res) => res.json())
      .then((data) => {
        changeSelectedLaneImage();
        data.sort((a, b) => a.rank - b.rank);
        set_original_list(data);
        if (params.lane) {
          data = data.filter((champ) => champ.lane === `${params.lane}lane`);
        }
        

        set_tier_list(data);
      });
  }
  useEffect(() => {
    getList();
  }, []);

  function handleLaneChange(e) {
    if (e.target.getAttribute("lane") === "") {
      set_tier_list(original_list);
        
      history.push("/");
      return changeSelectedLaneImage();
    }
    history.push({
      pathname: "/",
      search: `?lane=${e.target.getAttribute("lane")}`,
    });
    set_tier_list(
        [...original_list].filter(
        (champ) => champ.lane === `${e.target.getAttribute("lane")}lane`
      ).sort((a,b)=>tiers.indexOf(a.tier)-tiers.indexOf(b.tier))
    );
    changeSelectedLaneImage();
  }

  function changeSelectedLaneImage() {
    const param = queryString.parse(window.location.search);
    if (document.getElementsByClassName("lane_option_selected")[0]) {
      document
        .getElementsByClassName("lane_option_selected")[0]
        .classList.remove("lane_option_selected");
    }
    if (param.lane === undefined) {
      document
        .getElementsByClassName("lane_option")[0]
        .classList.add("lane_option_selected");
    } else {
      Array.from(document.getElementsByClassName("lane_option")).map((ele) => {
        if (ele.getAttribute("lane") === param.lane) {
          ele.classList.add("lane_option_selected");
        }
      });
    }
  }

  function doSort(sorted) {
    if (JSON.stringify(sorted) === JSON.stringify(tier_list)) {
      set_tier_list(sorted.reverse());
    }
    set_tier_list(sorted);
  }
  function SortByName() {
    const sorted = [...tier_list].sort((a, b) => a.name.localeCompare(b.name));
    doSort(sorted);
  }
  function SortByRank() {
    const sorted = [...tier_list].sort((a, b) => a.rank - b.rank);
    doSort(sorted);
  }
  function SortByRole() {
    const roles = [
      "toplane",
      "junglelane",
      "midlane",
      "botlane",
      "supportlane",
    ];
    const sorted = [...tier_list].sort(
      (a, b) => roles.indexOf(a.lane) - roles.indexOf(b.lane)
    );
    doSort(sorted);
  }

  function SortByTier() {
    const sorted = [...tier_list].sort(
      (a, b) => tiers.indexOf(a.tier) - tiers.indexOf(b.tier)
    );
    doSort(sorted);
  }
  function SortByWr() {
    const sorted = [...tier_list].sort((a, b) => b.win_rate - a.win_rate);
    doSort(sorted);
  }
  function SortByPr() {
    const sorted = [...tier_list].sort((a, b) => b.pick_rate - a.pick_rate);
    doSort(sorted);
  }
  function SortByBr() {
    const sorted = [...tier_list].sort((a, b) => b.ban_rate - a.ban_rate);
    doSort(sorted);
  }
  function SortByGp() {
    const sorted = [...tier_list].sort(
      (a, b) => parseInt(b.games_played) - parseInt(a.games_played)
    );
    doSort(sorted);
  }
  return (
    <div className="mid_container">
      <h1 className="title_h1">LoL Tier List</h1>
      <div className="options_bar">
        <div className="lanes_options option_container">
          <img
            alt="all_lanes_image"
            className="lane_option"
            lane=""
            src={allsvg}
            onClick={handleLaneChange}
          ></img>
          <img
            alt="top_lanes_image"
            className="lane_option"
            src={topsvg}
            lane="top"
            onClick={handleLaneChange}
          ></img>
          <img
            alt="jungle_lanes_image"
            className="lane_option"
            lane="jungle"
            src={junglesvg}
            onClick={handleLaneChange}
          ></img>
          <img
            alt="mid_lanes_image"
            className="lane_option"
            src={midsvg}
            lane="mid"
            onClick={handleLaneChange}
          ></img>
          <img
            alt="bottom_lanes_image"
            className="lane_option"
            lane="bot"
            src={bottomsvg}
            onClick={handleLaneChange}
          ></img>
          <img
            alt="support_lanes_image"
            className="lane_option"
            lane="support"
            src={supportsvg}
            onClick={handleLaneChange}
          ></img>
        </div>

        <div className="rank_option option_container">
          <div className="rank_option_image_container">
            <img
              alt="rank_image"
              className="rank_option_image"
              src={plat}
            ></img>
          </div>
          <span className="rank_option_span option_span">Platinum+</span>
        </div>
        <div className="rank_type_option option_container">
          <span className=" rank_type_span option_span">Ranked Solo</span>
        </div>
        <div className="patch_option option_container">
          <span className="patch_span option_span">11.15</span>
        </div>
      </div>
      <div className="tier_table_container">
        <table className="tier_table">
          <thead>
            <tr className="tier_table_row">
              <th onClick={SortByRank}>Rank</th>
              <th onClick={SortByRole}>Role</th>
              <th onClick={SortByName}>Champion</th>
              <th onClick={SortByTier}>Tier</th>
              <th onClick={SortByWr}>Win Rate</th>
              <th onClick={SortByPr}>Pick Rate</th>
              <th onClick={SortByBr}>Ban Rate</th>
              <th onClick={SortByGp}>Games Played</th>
            </tr>
          </thead>
          <tbody>
            {tier_list &&
              tier_list.map((champ,i) => {
                return (
                  <tr key={champ.name} className={`tier_table_row ${i%2===0 && "dark_row"}`}>
                   <td>{champ.rank}</td>

                    <td>
                      <img
                        alt="lane_image"
                        src={laneImage[0][champ.lane]}
                      ></img>
                    </td>
                    <td className="champ_td">
                      <div
                        className="champ_image"
                        style={{
                          backgroundImage: `url(${
                            champImage[0][champ.image.image]
                          })`,
                          backgroundPosition: ` -${
                            (parseInt(champ.image.column) - 1) * 48
                          }px -${(parseInt(champ.image.row) - 1) * 48}px `,
                        }}
                      ></div>
                      <div className="champ_name">{champ.name}</div>
                    </td>
                    <td>{champ.tier}</td>
                    <td>{champ.win_rate}%</td>
                    <td>{champ.pick_rate}%</td>
                    <td>{champ.ban_rate}%</td>
                    <td>{champ.games_played}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
