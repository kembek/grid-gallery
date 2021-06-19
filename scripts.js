const FIRST_DESCRIPTION_TEXT = `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis
velit odit cum repellendus animi, at doloremque nemo asperiores,
esse, sit amet cupiditate necessitatibus est eius? Excepturi
reprehenderit quod totam facere?`;
const SECOND_DESCRIPTION_TEXT = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
provident ipsam facere quaerat sequi numquam doloribus dolore
molestiae, consequuntur recusandae dolores qui ab quae consequatur
culpa nobis, dolor labore nemo?`;

const images = [
  {
    src: "https://picsum.photos/id/1037/600/600",
    alt: "photography of trees",
    title: "Glacier Point golden hour",
    descriptions: [FIRST_DESCRIPTION_TEXT, SECOND_DESCRIPTION_TEXT],
  },
  {
    src: "https://picsum.photos/id/1020/600/600",
    alt: "grizzly bear walking on mountain",
    title: "Bear family in Yellowstone",
    descriptions: [FIRST_DESCRIPTION_TEXT, SECOND_DESCRIPTION_TEXT],
  },
  {
    src: "https://picsum.photos/id/1043/600/600",
    alt: "calm body of water surrounded by trees near cliff",
    title: "River beneath Yosemite cliffs",
    descriptions: [FIRST_DESCRIPTION_TEXT],
  },
  {
    src: "https://picsum.photos/id/1050/600/600",
    alt: "landscape photo of green and brown cliffs",
    title: "Beautiful cliff around beach",
    descriptions: [SECOND_DESCRIPTION_TEXT],
  },
];

function createTypography({ tag, content, className }) {
  const titleNode = document.createElement(tag);
  titleNode.textContent = content;
  titleNode.classList.add(className);
  return titleNode;
}

function createDescriptions(descs) {
  return descs.map((text) => {
    return createTypography({
      tag: "p",
      content: text,
      className: "image-card__description",
    });
  });
}

function createTitle(title) {
  return createTypography({
    tag: "h3",
    content: title,
    className: "image-card__title",
  });
}

function createImage(src, alt) {
  const imageNode = document.createElement("img");
  imageNode.classList.add("image-card__image");
  imageNode.src = src;
  imageNode.alt = alt;
  return imageNode;
}

function createContainer(className, tag = "div") {
  const containerNode = document.createElement(tag);
  containerNode.classList.add(className);
  return containerNode;
}

function createImageCard(option) {
  const { title, descriptions, src, alt } = option;

  const imageCardNode = createContainer("image-card");
  const detailsNode = createContainer("image-card__details");
  const imageNode = createImage(src, alt);
  const titleNode = createTitle(title);
  const descriptionNodes = createDescriptions(descriptions);

  detailsNode.append(titleNode, ...descriptionNodes);
  imageCardNode.append(imageNode, detailsNode);
  imageCardNode.classList.add("visually-hidden");

  return imageCardNode;
}

function onClickImageCardButton(buttonNode) {
  document.documentElement.classList.toggle("show-detail");

  const appeared = document.documentElement.classList.contains("show-detail");
  const asideDetailsNode = document.querySelector(".aside__details");

  if (appeared) {
    const imageCardNode = buttonNode.querySelector(".image-card");
    const newImageCardNode = imageCardNode.cloneNode(true);

    newImageCardNode.classList.remove("visually-hidden");
    asideDetailsNode.append(newImageCardNode);
  } else {
    asideDetailsNode.innerHTML = "";
  }
}

function createButton(src) {
  const buttonNode = document.createElement("button");
  buttonNode.type = "button";
  buttonNode.classList.add("image-card__button");
  buttonNode.style.backgroundImage = `url(${src})`;
  buttonNode.addEventListener("click", () =>
    onClickImageCardButton(buttonNode)
  );

  return buttonNode;
}

function createGallery(data) {
  const galleryNode = createContainer("gallery", "section");
  const imageNodes = data.map((option) => {
    const galleryItemNode = createContainer("gallery__item");
    const buttonNode = createButton(option.src);
    buttonNode.append(createImageCard(option));
    galleryItemNode.append(buttonNode);
    return galleryItemNode;
  });

  galleryNode.append(...imageNodes);
  return galleryNode;
}

function killAside() {
  document.documentElement.classList.remove("show-detail");
  const asideDetailsNode = document.querySelector(".aside__details");

  asideDetailsNode.innerHTML = "";
}

function attachCloseEvent() {
  const closeButton = document.querySelector(".aside__close-button");
  closeButton.addEventListener("click", () => {
    killAside();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector("main.main");
  const gallery = createGallery(images);
  root.append(gallery);

  root.addEventListener("click", (event) => {
    const galleryItemNode = event.target.closest(".gallery__item");

    if (galleryItemNode) {
      return;
    }

    killAside();
  });

  attachCloseEvent();
});
