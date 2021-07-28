import "./App.css";
import allsvg from "./static/all.svg";
import midsvg from "./static/mid.svg";
import topsvg from "./static/top.svg";
import bottomsvg from "./static/bot.svg";
import junglesvg from "./static/jung.svg";
import supportsvg from "./static/supp.svg";
import plat from "./static/plat.png";
function App() {
  return (
    <div className="mid_container">
      <h1 className="title_h1">LoL Tier List</h1>
      <div className="options_bar">
        <div className="lanes_options option_container">
          <img alt="all_lanes_image" className="lane_option lane_option_selected" src={allsvg}></img>
          <img alt="top_lanes_image" className="lane_option" src={topsvg}></img>
          <img alt="jungle_lanes_image" className="lane_option" src={junglesvg}></img>
          <img alt="mid_lanes_image" className="lane_option" src={midsvg}></img>
          <img alt="bottom_lanes_image" className="lane_option" src={bottomsvg}></img>
          <img alt="support_lanes_image" className="lane_option" src={supportsvg}></img>
        </div>

        <div className="rank_option option_container">
          <div className="rank_option_image_container">
            <img alt="rank_image" className="rank_option_image" src={plat}></img>
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
              <th>Rank</th>
              <th>Role</th>
              <th>Champion</th>
              <th>Tier</th>
              <th>Win Rate</th>
              <th>Pick Rate</th>
              <th>Ban Rate</th>
              <th>Games Played</th>
            </tr>
          </thead>
          <tbody>
            <tr className="tier_table_row">
              <td>1</td>
              <td><img alt="lane_image" src={junglesvg}></img></td>
              <td>Lulu</td>
              <td>S+</td>
              <td>53.32%</td>
              <td>15.5%</td>
              <td>44.5%</td>
              <td>321,321</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
