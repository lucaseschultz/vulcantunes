// import React, {useState} from 'react'
//
//
// const searchBar = () => {
//
//   const [searchInput, setSearchInput] = useState("");
//
//   const countries = [
//
//     { name: "Belgium", continent: "Europe" },
//     { name: "India", continent: "Asia" },
//     { name: "Bolivia", continent: "South America" },
//     { name: "Ghana", continent: "Africa" },
//     { name: "Japan", continent: "Asia" },
//     { name: "Canada", continent: "North America" },
//     { name: "New Zealand", continent: "Australasia" },
//     { name: "Italy", continent: "Europe" },
//     { name: "South Africa", continent: "Africa" },
//     { name: "China", continent: "Asia" },
//     { name: "Paraguay", continent: "South America" },
//     { name: "Usa", continent: "North America" },
//     { name: "France", continent: "Europe" },
//     { name: "Botswana", continent: "Africa" },
//     { name: "Spain", continent: "Europe" },
//     { name: "Senegal", continent: "Africa" },
//     { name: "Brazil", continent: "South America" },
//     { name: "Denmark", continent: "Europe" },
//     { name: "Mexico", continent: "South America" },
//     { name: "Australia", continent: "Australasia" },
//     { name: "Tanzania", continent: "Africa" },
//     { name: "Bangladesh", continent: "Asia" },
//     { name: "Portugal", continent: "Europe" },
//     { name: "Pakistan", continent: "Asia" },
//
//   ];
//
//   const handleChange = (e: any) => {
//     e.preventDefault();
//     setSearchInput(e.target.value);
//   };
//
//   if (searchInput.length > 0) {
//     countries.filter((country) => {
//       return country.name.match(searchInput);
//     });
//   }
//
//   return <div>
//
//     <input
//       type="search"
//       placeholder="Search here"
//       onChange={handleChange}
//       value={searchInput} />
//
//     <table>
//       <tr>
//         <th>Country</th>
//         <th>Continent</th>
//       </tr>
//
//       {countries.map((country, *index*) => {
//
//         <div>
//         <tr>
//         <td>{country.name}</td>
//     <td>{country.continent}</td>
//   </tr>
// </div>
//
// })}
// </table>
//
// </div>
//
//
// };
//
// export default searchBar;

// {/*<div className={'products'}>*/}
// {/* ##Filler */}
// <div className={'products'} style={{backgroundColor: 'green', maxWidth: '600px'}}>
//   Lorem ipsum odor amet, consectetuer adipiscing elit. Duis semper fames vivamus quisque litora ad maecenas cursus
//   efficitur. Habitasse suscipit mus; integer neque varius fermentum. Lobortis hendrerit turpis felis felis dis et
//   ac. Tellus leo congue mauris arcu luctus. Duis pellentesque fringilla neque, consequat interdum vitae. Laoreet
//   sed nulla mattis conubia suspendisse mi primis.
//   <br/><br/>
//   Sollicitudin ante erat id proin nam lectus neque turpis. Netus curae pretium est consectetur vestibulum nam
//   congue nostra donec. Ad vulputate senectus curae adipiscing aliquet ultrices eros proin. Varius adipiscing
//   vivamus sociosqu conubia cursus iaculis ex rhoncus. Adipiscing quis aenean malesuada facilisi elit at feugiat.
//   Convallis fringilla diam pharetra etiam netus iaculis himenaeos. Nullam porta nibh pulvinar conubia donec
//   lectus. Donec aptent ultricies nunc non ante maecenas in.
//   <br/><br/>
//   Risus integer molestie natoque taciti etiam euismod dapibus. Nunc commodo mattis nibh tempus quis gravida dui.
//   Pellentesque tempus ultricies mus viverra luctus orci interdum commodo. Lacus volutpat montes commodo sociosqu
//   pellentesque eget imperdiet. Justo cubilia quis ridiculus lacus nunc. Facilisis augue libero leo litora neque
//   praesent?
//   <br/><br/>
//   Lobortis vitae ut, lectus turpis egestas dignissim hendrerit molestie eget. Fames a ornare, condimentum
//   hendrerit tempor eget elit senectus. Vulputate arcu sociosqu quam, nascetur lectus nulla orci. Volutpat libero
//   massa efficitur; sapien sociosqu euismod massa. Mattis congue tristique libero habitant pellentesque mollis
//   vitae lectus et. Nisl facilisis aenean curabitur placerat id rhoncus vivamus consequat? Orci erat lacinia eros
//   commodo adipiscing proin at praesent. Curabitur aliquam nec ornare nam dolor est.
//   <br/><br/>
//   Porttitor dictum enim varius sapien neque netus lectus hendrerit maecenas. Laoreet venenatis quisque taciti
//   mollis imperdiet ac nostra eros. Orci sociosqu dignissim non adipiscing scelerisque ad facilisi turpis inceptos.
//   Commodo platea ultricies lobortis nascetur curae nam mattis. Lorem risus condimentum nibh mollis dictum ex.
//   Cursus inceptos feugiat potenti malesuada proin primis nascetur. Enim volutpat pellentesque vulputate congue
//   ante pretium posuere. In potenti tristique gravida orci eleifend odio aliquam. Eget rhoncus iaculis malesuada a
//   orci tellus; consectetur porta.
// </div>