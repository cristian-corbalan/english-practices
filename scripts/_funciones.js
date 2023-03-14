'use strict'

/**
 * Return a random index from an array.
 * @param {[]} array
 * @return {number}
 */
const getRandomPosition = (array) => {
    return Math.floor(Math.random() * array.length);
}

/**
 * Create a new HTML tag and return this
 * @param {string} name
 * @param {{}} attributes The attribute name is the key of the object and the attribute value is the value of the property
 * @param {string | number} content
 * @return {any | Element}
 */
const createHtmlTag = (name = null, attributes = null, content = null) => {
    if (!name) {
        console.error('The name tag is required');
        return;
    }

    let tag = document.createElement(name);

    if (attributes) {
        for (const attribute in attributes) {
            tag.setAttribute(attribute, attributes[attribute])
        }
    }

    if (content !== null || content !== '') {
        tag.innerHTML = content;
    }

    return tag;
}