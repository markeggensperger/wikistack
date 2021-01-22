const express = require('express');
const router = express.Router();
const addPage = require('../views/addPage');
const main = require('../views/main');
const wikipage = require('../views/wikipage');
const { db, Page, User } = require('../models');

router.get('/', async (req, res, next) => {
  try {
    const pages = await Page.findAll();
    res.send(main(pages));
  } catch (error) {
    console.error(error);
  }
});
router.get('/add', (req, res) => {
  res.send(addPage());
});

router.get('/:slug', async (req, res, next) => {
  try {
    const slug = req.params.slug;
    const page = await Page.findOne({
      where: { slug: slug },
    });
    res.send(wikipage(page, 'anonymous'));
  } catch (error) {
    console.error(error);
  }
});

router.post('/', async (req, res, next) => {
  console.log(req.body);
  try {
    const page = await Page.create({
      title: req.body.title,
      content: req.body.content,
      //slug: generateSlug(req.body.title),
      status: req.body.status,
    });
    console.log(page);
    // make sure we only redirect *after* our save is complete! Don't forget to `await` the previous step. `create` returns a Promise.
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
