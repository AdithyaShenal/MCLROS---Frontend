function WaypointdMarker(number: number) {
  const el = document.createElement("div");
  el.style.backgroundColor = "#1A73E8";
  el.style.color = "#fff";
  el.style.width = "30px";
  el.style.height = "30px";
  el.style.borderRadius = "50%";
  el.style.display = "flex";
  el.style.alignItems = "center";
  el.style.justifyContent = "center";
  el.style.fontWeight = "bold";
  el.style.fontSize = "14px";
  el.innerText = number.toString();

  return el;
}

export default WaypointdMarker;
