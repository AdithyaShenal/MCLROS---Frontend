const depotMarker = () => {
  const el = document.createElement("div");
  el.style.backgroundColor = "#FF0000"; // red color for depot
  el.style.width = "30px";
  el.style.height = "30px";
  el.style.borderRadius = "50%";
  el.style.display = "flex";
  el.style.alignItems = "center";
  el.style.justifyContent = "center";
  el.style.fontWeight = "bold";
  el.style.color = "#fff";
  el.innerText = "D"; // Depot letter
  return el;
};

export default depotMarker;
