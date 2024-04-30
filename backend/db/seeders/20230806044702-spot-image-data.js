"use strict";
/** @type {import('sequelize-cli').Migration} */

const { SpotImage } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const spotImages = [
  {
    spotId: 1,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-52686564/original/114b74de-07f5-416a-bd8d-e0ad71adc198.jpeg?im_w=960",
    preview: true,
  },
  {
    spotId: 1,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-52686564/original/eeeeadb2-a807-4476-a29e-f068453657b2.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 1,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-52686564/original/9d620c9d-d99d-40d9-b1ec-142ba0882b36.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 1,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-52686564/original/91e50986-499e-489b-aed3-e197e8468363.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 1,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-52686564/original/797a80ff-6199-4cbb-8236-2e339c2473c1.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 2,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-807318285919721411/original/302b14be-2093-44c8-8cb2-6bcf97692543.jpeg?im_w=960",
    preview: true,
  },
  {
    spotId: 2,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-807318285919721411/original/9ecb95d7-36ce-4089-ab01-42161af12f67.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 2,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-807318285919721411/original/ac976745-d661-4ec7-919a-3608d7673bc8.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 2,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-807318285919721411/original/a1553821-7c02-46a6-b3ff-6cc9c508dade.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 2,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-807318285919721411/original/e2420992-1e73-4e88-9d6d-c4cdeb8c980c.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 3,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-745787028816952393/original/2b38eb6e-0b90-4c5f-aa30-0636b0610b51.jpeg?im_w=960",
    preview: true,
  },
  {
    spotId: 3,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-745787028816952393/original/a03df883-b214-436a-8d7f-43818d7b162f.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 3,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-745787028816952393/original/7d9035bd-f51a-437b-a58f-d4b91bce644f.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 3,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-745787028816952393/original/c9a96545-e80e-439e-819e-5f96c1f5dc21.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 3,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-745787028816952393/original/9439c207-722a-4500-94e6-05cde13afe3a.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 4,
    url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-874792311767559410/original/cfeb2d9f-d9c4-4d8d-aa75-9276b74c9fd6.jpeg?im_w=960",
    preview: true,
  },
  {
    spotId: 4,
    url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-874792311767559410/original/b5c39c81-f027-4e2a-8b1f-53f08a1c56e2.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 4,
    url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-874792311767559410/original/d85d2d56-5a44-408e-bbe4-8cadde6d6675.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 4,
    url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-874792311767559410/original/1b619129-fc16-420d-ae09-33be6ff5155d.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 4,
    url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-874792311767559410/original/d6525a1b-c6e1-4be3-ac0e-57a51b084f8f.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 5,
    url: "https://a0.muscache.com/im/pictures/7ffcec50-4c27-460d-8503-61a0ce42cec9.jpg?im_w=960",
    preview: true,
  },
  {
    spotId: 5,
    url: "https://a0.muscache.com/im/pictures/9620f85c-c88e-44de-b609-f705358c3a29.jpg?im_w=720",
    preview: false,
  },
  {
    spotId: 5,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-726709440920383661/original/4a3a41d0-fb19-4fdc-8678-46dca62e6120.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 5,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-726709440920383661/original/ca3337ea-6668-412b-8248-91480056d670.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 5,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-726709440920383661/original/8d777689-2d39-4125-a8b8-33d5dce395ff.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 6,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-810798254819092849/original/91764250-b27c-4a4d-ba5d-93a18f1deceb.jpeg?im_w=960",
    preview: true,
  },
  {
    spotId: 6,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-810798254819092849/original/157af15a-848e-4b9b-aa01-893aa054ba44.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 6,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-810798254819092849/original/08526ad5-f336-47f7-a067-9f69fd487b54.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 6,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-810798254819092849/original/aa051dfe-178e-4a0e-89eb-ab65adbabd3f.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 6,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-810798254819092849/original/03a9bea0-da9a-414c-99f8-76da742868ea.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 7,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-54345600/original/890d502a-1bc9-4c07-9f76-dd7d18cc1eaa.jpeg?im_w=960",
    preview: true,
  },
  {
    spotId: 7,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-54345600/original/f327cf87-a9d1-4140-a52b-256fd31f5d86.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 7,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-54345600/original/32f965d0-9e92-4f7b-bc8c-8d128d35ea3d.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 7,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-54345600/original/b7ec522a-9ab8-4e81-b6af-e93db88fb441.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 7,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-54345600/original/6496e4fe-d8af-4549-a1fc-5a357aa2e05b.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 8,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-691269799420891982/original/c812de5a-6a09-4f4e-beb2-42871d5ebd19.jpeg?im_w=960",
    preview: true,
  },
  {
    spotId: 8,
    url: "https://a0.muscache.com/im/pictures/071ed891-d810-441f-90fc-8b40884585f7.jpg?im_w=720",
    preview: false,
  },
  {
    spotId: 8,
    url: "https://a0.muscache.com/im/pictures/e604fcf6-f5b9-46a2-9d4f-cfadda89e2dc.jpg?im_w=720",
    preview: false,
  },
  {
    spotId: 8,
    url: "https://a0.muscache.com/im/pictures/5633e36b-2697-4c0d-9ab4-4210c27911e3.jpg?im_w=720",
    preview: false,
  },
  {
    spotId: 8,
    url: "https://a0.muscache.com/im/pictures/7d01efa9-b807-4e4d-a026-d97a9a2e7871.jpg?im_w=720",
    preview: false,
  },
  {
    spotId: 9,
    url: "https://a0.muscache.com/im/pictures/hosting/Hosting-951661818838748193/original/6d0eaacd-f340-453c-b874-087ea43fad6e.jpeg?im_w=960",
    preview: true,
  },
  {
    spotId: 9,
    url: "https://a0.muscache.com/im/pictures/hosting/Hosting-951661818838748193/original/c02c7788-fb0d-45e0-8956-5dbe56b00e6b.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 9,
    url: "https://a0.muscache.com/im/pictures/hosting/Hosting-951661818838748193/original/f69f431b-f8f8-4dca-97de-28093e9af807.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 9,
    url: "https://a0.muscache.com/im/pictures/47f1d429-3118-4cf4-9d81-278d64f31448.jpg?im_w=720",
    preview: false,
  },
  {
    spotId: 9,
    url: "https://a0.muscache.com/im/pictures/hosting/Hosting-951661818838748193/original/e5e32e1c-fbc3-4658-a858-d0a542b21cf2.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 10,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-590701273420167344/original/ab49d79c-6d2d-4d20-88a9-3e3e9e350ee7.jpeg?im_w=960",
    preview: true,
  },
  {
    spotId: 10,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-590701273420167344/original/16b82121-33ba-40cf-b364-8eaaedfc9da9.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 10,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-590701273420167344/original/121f08cb-f0be-451c-98b9-4e6b370114fa.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 10,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-590701273420167344/original/67998338-ba74-43aa-ba48-1c00f1599042.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 10,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-590701273420167344/original/fcabfd79-219a-40a4-8fb2-32928cfd05a7.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 11,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-619084673674420829/original/3083b193-dcc8-4409-b608-0749b5d2c750.jpeg?im_w=960",
    preview: true,
  },
  {
    spotId: 11,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-619084673674420829/original/5d2d3e77-1e18-41d9-94ba-4f78e017160d.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 11,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-619084673674420829/original/b22da5fe-c756-4875-9022-998c4e460d6d.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 11,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-619084673674420829/original/e38435e5-1aa2-4c0f-a7e7-e3e21db33372.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 11,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-619084673674420829/original/80654621-812f-4f28-9120-ea5f0da423c2.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 12,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-609324833610636816/original/cda82850-7e04-436b-9804-3252b17da87a.jpeg?im_w=960",
    preview: true,
  },
  {
    spotId: 12,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-609324833610636816/original/85591841-f000-4886-8d8d-6cb2fd9250c6.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 12,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-609324833610636816/original/e20e2efe-cb7d-41f9-bc8d-165c80c7a7b5.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 12,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-609324833610636816/original/7569417b-8d02-4358-a6b9-701422cf6da4.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 12,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-609324833610636816/original/2dc5cc8b-d227-42f2-bf3c-2329755c4dee.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 13,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-686879494606515465/original/77256104-a133-4f60-b63b-c6fe16cc1a48.jpeg?im_w=960",
    preview: true,
  },
  {
    spotId: 13,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-686879494606515465/original/11da70db-253a-41af-971c-32befe33146a.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 13,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-686879494606515465/original/5902a08f-56fa-4935-9ed4-a21ab5fd28e9.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 13,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-686879494606515465/original/e13d7209-283d-4648-b542-2420f274f8a5.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 13,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-686879494606515465/original/07a7e30d-0cc3-4311-bb77-21d96ff98137.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 14,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-730500890090602487/original/95588890-c7fb-45e8-b931-bee328971f94.jpeg?im_w=960",
    preview: true,
  },
  {
    spotId: 14,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-730500890090602487/original/b1aa0179-b86c-4218-8570-5445d85762a0.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 14,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-730500890090602487/original/2dfa159b-dd69-4a6c-bfde-d6c79ad1d3d6.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 14,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-730500890090602487/original/7bd354a5-e5d0-4009-b07c-76b30cc50d5e.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 14,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-730500890090602487/original/e2749691-3dcd-4f33-a5fa-f33757b31b3e.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 15,
    url: "https://a0.muscache.com/im/pictures/f1bd83de-ce14-46b3-ac37-5f825c49116e.jpg?im_w=960",
    preview: true,
  },
  {
    spotId: 15,
    url: "https://a0.muscache.com/im/pictures/d1a12c27-9ef7-4497-b529-33ca7b924a97.jpg?im_w=720",
    preview: false,
  },
  {
    spotId: 15,
    url: "https://a0.muscache.com/im/pictures/7ddcda1e-3753-454c-8a68-ac6b5f0a808d.jpg?im_w=720",
    preview: false,
  },
  {
    spotId: 15,
    url: "https://a0.muscache.com/im/pictures/a6d90f9d-6243-447a-8a9b-aeb8f2da5fc3.jpg?im_w=720",
    preview: false,
  },
  {
    spotId: 15,
    url: "https://a0.muscache.com/im/pictures/6fd885ff-2a07-4965-8eb4-1dc5ca69696c.jpg?im_w=720",
    preview: false,
  },
  {
    spotId: 16,
    url: "https://a0.muscache.com/im/pictures/5253cd6c-a883-4a57-ba7e-b2008628ab64.jpg?im_w=960",
    preview: true,
  },
  {
    spotId: 16,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-644901375864690848/original/76913ef5-7aea-43b6-a6fc-c8819e0a4bb2.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 16,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-644901375864690848/original/514dfa28-c352-4b8e-85df-a256da65d4a6.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 16,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-644901375864690848/original/949919b6-bcab-4671-9bb0-ebdbb1dc5817.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 16,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-644901375864690848/original/241a62db-0868-4859-b85e-05b7c379da5f.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 17,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-50775664/original/e0190a99-b22b-4ca1-ab7e-8fc2f811a40f.jpeg?im_w=960",
    preview: true,
  },
  {
    spotId: 17,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-50775664/original/b7535555-e8a6-48ca-8886-c0e11691d67c.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 17,
    url: "https://a0.muscache.com/im/pictures/b7d70310-01aa-4919-8e75-c18397286e60.jpg?im_w=720",
    preview: false,
  },
  {
    spotId: 17,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-50775664/original/67113279-1d47-4232-b1d7-380d0dcd67dd.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 17,
    url: "https://a0.muscache.com/im/pictures/f40e3516-4ade-499a-90e5-ee1dab2bf4c2.jpg?im_w=720",
    preview: false,
  },
  {
    spotId: 18,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-967705749494070151/original/d7bbdb66-f127-473e-ad69-863ddfdfb928.jpeg?im_w=960",
    preview: true,
  },
  {
    spotId: 18,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-967705749494070151/original/e38a8d42-43f5-4f0f-a8bb-79bd3822ba7b.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 18,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-967705749494070151/original/022b1a7a-8f4c-4f53-a87d-880878b92736.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 18,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-967705749494070151/original/769f076c-3428-48ce-9fd1-014d62a3f71a.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 18,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-967705749494070151/original/e5225b85-dafd-4978-8407-f2dfcfb6c0a0.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 19,
    url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-915392795641705685/original/6f2b8106-12b2-4d4b-9f26-4d86590aa725.jpeg?im_w=960",
    preview: true,
  },
  {
    spotId: 19,
    url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-915392795641705685/original/770786fd-9cb4-4765-9ac2-71fb5357ba60.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 19,
    url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-915392795641705685/original/ab526b36-8f40-405f-bf59-641050bf27a7.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 19,
    url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-915392795641705685/original/40f1fc56-64e3-4c91-ad80-9d5ea9b3350d.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 19,
    url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-915392795641705685/original/7b49086f-e73e-453c-842e-5b59e5b3c38c.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 20,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-807949782974019445/original/c06c7725-7907-4bd0-b5da-57ec33d86eb6.jpeg?im_w=960",
    preview: true,
  },
  {
    spotId: 20,
    url: "https://a0.muscache.com/im/pictures/aad35284-54c6-4123-ae5f-2d319d3c82cb.jpg?im_w=720",
    preview: false,
  },
  {
    spotId: 20,
    url: "https://a0.muscache.com/im/pictures/30cd524e-f878-4bd1-b03f-e7a091aa8042.jpg?im_w=720",
    preview: false,
  },
  {
    spotId: 20,
    url: "https://a0.muscache.com/im/pictures/109bba0d-1e46-405c-bb9a-d56b4786ebf9.jpg?im_w=720",
    preview: false,
  },
  {
    spotId: 20,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-807949782974019445/original/581e4045-3833-4445-b5db-83e9c1c0164b.jpeg?im_w=720",
    preview: false,
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    await SpotImage.bulkCreate(spotImages, {
      validate: true,
    });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    await queryInterface.bulkDelete(
      options,
      {
        url: spotImages.map((spotImage) => spotImage.url),
      },
      {}
    );
  },
};
