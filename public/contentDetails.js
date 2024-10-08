console.clear();

let id = location.search.split("?")[1];
console.log(id);

if (document.cookie.indexOf(",counter=") >= 0) {
  let counter = document.cookie.split(",")[1].split("=")[1];
  document.getElementById("badge").innerHTML = counter;
}
function dynamicContentDetails(ob) {
  let mainContainer = document.createElement("div");
  mainContainer.id = "containerD";
  document.getElementById("containerProduct").appendChild(mainContainer);

  let imageSectionDiv = document.createElement("div");
  imageSectionDiv.id = "imageSection";

  let imgTag = document.createElement("img");
  imgTag.id = "imgDetails";
  imgTag.src = ob.preview;
  imageSectionDiv.appendChild(imgTag);

  let productDetailsDiv = document.createElement("div");
  productDetailsDiv.id = "productDetails";

  let h1 = document.createElement("h1");
  let h1Text = document.createTextNode(ob.name);
  h1.appendChild(h1Text);

  let h4 = document.createElement("h4");
  let h4Text = document.createTextNode(ob.brand);
  h4.appendChild(h4Text);

  let detailsDiv = document.createElement("div");
  detailsDiv.id = "details";

  let h3DetailsDiv = document.createElement("h3");
  let h3DetailsText = document.createTextNode("Rs " + ob.price);
  h3DetailsDiv.appendChild(h3DetailsText);

  let h3 = document.createElement("h3");
  let h3Text = document.createTextNode("Description");
  h3.appendChild(h3Text);

  let para = document.createElement("p");
  let paraText = document.createTextNode(ob.description);
  para.appendChild(paraText);

  // Specifications Section
  let specDiv = document.createElement("div");
  specDiv.id = "specifications";

  let h3Spec = document.createElement("h3");
  let h3SpecText = document.createTextNode("Specifications");
  h3Spec.appendChild(h3SpecText);

  let table = document.createElement("table");
  table.id = "specTable";
  table.classList.add("spec-table");

  let tbody = document.createElement("tbody");

  // Adding specifications as key-value pairs
  ob.specifications.forEach(spec => {
    let row = document.createElement("tr");

    let keyCell = document.createElement("td");
    keyCell.textContent = spec.key;
    keyCell.classList.add("spec-key");

    let valueCell = document.createElement("td");
    valueCell.textContent = spec.value;
    valueCell.classList.add("spec-value");

    row.appendChild(keyCell);
    row.appendChild(valueCell);

    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  specDiv.appendChild(h3Spec);
  specDiv.appendChild(table);

  let productPreviewDiv = document.createElement("div");
  productPreviewDiv.id = "productPreview";

  let h3ProductPreviewDiv = document.createElement("h3");
  let h3ProductPreviewText = document.createTextNode("Product Preview");
  h3ProductPreviewDiv.appendChild(h3ProductPreviewText);
  productPreviewDiv.appendChild(h3ProductPreviewDiv);

  for (let i = 0; i < ob.photos.length; i++) {
    let imgTagProductPreviewDiv = document.createElement("img");
    imgTagProductPreviewDiv.id = "previewImg";
    imgTagProductPreviewDiv.src = ob.photos[i];
    imgTagProductPreviewDiv.onclick = function () {
      console.log("clicked " + this.src);
      imgTag.src = this.src;
      document.getElementById("imgDetails").src = this.src;
    };
    productPreviewDiv.appendChild(imgTagProductPreviewDiv);
  }

  // 360 View Button
  let view360Button = document.createElement("button");
  view360Button.id = "view360";
  view360Button.textContent = "360 View";
  view360Button.onclick = function () {
    // Redirect to 3d.html
    window.location.href = "3d.html";
  };
  productPreviewDiv.appendChild(view360Button);

  let buttonDiv = document.createElement("div");
  buttonDiv.id = "button";

  let buttonTag = document.createElement("button");
  let buttonText = document.createTextNode("Add to Cart");
  buttonTag.appendChild(buttonText);

  buttonTag.onclick = function () {
    let order = id + " ";
    let counter = 1;
    if (document.cookie.indexOf(",counter=") >= 0) {
      order = id + " " + document.cookie.split(",")[0].split("=")[1];
      counter = Number(document.cookie.split(",")[1].split("=")[1]) + 1;
    }
    document.cookie = "orderId=" + order + ",counter=" + counter;
    document.getElementById("badge").innerHTML = counter;
    console.log(document.cookie);
    alert("Product Added to cart");
  };

  buttonDiv.appendChild(buttonTag);

  mainContainer.appendChild(imageSectionDiv);
  mainContainer.appendChild(productDetailsDiv);
  productDetailsDiv.appendChild(h1);
  productDetailsDiv.appendChild(h4);
  productDetailsDiv.appendChild(detailsDiv);
  detailsDiv.appendChild(h3DetailsDiv);
  detailsDiv.appendChild(h3);
  detailsDiv.appendChild(para);
  productDetailsDiv.appendChild(specDiv); // Append specifications section
  productDetailsDiv.appendChild(productPreviewDiv);
  productDetailsDiv.appendChild(buttonDiv);

  return mainContainer;
}



// BACKEND CALLING

let httpRequest = new XMLHttpRequest();
httpRequest.onreadystatechange = function () {
  if (this.readyState === 4 && this.status == 200) {
    console.log("connected!!");
    let contentDetails = JSON.parse(this.responseText);
    console.log(contentDetails);
    dynamicContentDetails(contentDetails);
  } else {
    console.log("not connected!");
  }
};

httpRequest.open(
  "GET",
  "https://6684cfe256e7503d1ae13c1f.mockapi.io/homeappliancesproducts/" + id,
  true
);
httpRequest.send();
