-- Health360 app-only Supabase restore
-- Generated from db_cluster-24-09-2025@19-49-15.backup.gz
-- Restores only public.products, public.customers, public.orders, public.order_items.

BEGIN;

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;

DROP TABLE IF EXISTS public.order_items CASCADE;
DROP TABLE IF EXISTS public.orders CASCADE;
DROP TABLE IF EXISTS public.products CASCADE;
DROP TABLE IF EXISTS public.customers CASCADE;

CREATE TABLE public.customers (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    first_name character varying(100) NOT NULL,
    last_name character varying(100) NOT NULL,
    email character varying(255) NOT NULL,
    phone character varying(20),
    city character varying(100),
    country character varying(100)
);



--
-- Name: order_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_items (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    order_id uuid,
    product_id uuid,
    quantity integer NOT NULL,
    unit_price numeric(10,2) NOT NULL
);



--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    customer_id uuid,
    status character varying(50) DEFAULT 'pending'::character varying NOT NULL,
    subtotal numeric(10,2) NOT NULL,
    tax numeric(10,2) NOT NULL,
    total numeric(10,2) NOT NULL
);



--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    name character varying(255) NOT NULL,
    sku character varying(100) NOT NULL,
    category character varying(100) NOT NULL,
    form character varying(100) NOT NULL,
    brand character varying(255) NOT NULL,
    price numeric(10,2) NOT NULL,
    inventory integer DEFAULT 0 NOT NULL,
    status character varying(50) DEFAULT 'active'::character varying NOT NULL,
    image_url text,
    rating numeric(3,2),
    reviews integer,
    description text
);

COPY public.customers (id, created_at, first_name, last_name, email, phone, city, country) FROM stdin;
9f58de6d-d52a-4110-95fd-714592156042	2025-09-16 14:39:58.973325+00	Aarav	Sharma	aarav.sharma@email.com	+91-9876543210	Mumbai	India
4b5a2ee0-06a4-47b9-9984-d1f1870bad77	2025-09-16 14:39:58.973325+00	Diya	Verma	diya.verma@email.com	+91-9876543211	Delhi	India
6261d062-7930-4814-aa0b-7eb3d904dd66	2025-09-16 14:39:58.973325+00	Ishaan	Gupta	ishaan.gupta@email.com	+91-9876543212	Bengaluru	India
ab8498c1-ae24-41dc-90d8-71fb93508891	2025-09-16 14:39:58.973325+00	Ananya	Reddy	ananya.reddy@email.com	+91-9876543213	Hyderabad	India
a377a53a-2642-4a23-8c7a-adceaa1bc3f4	2025-09-16 14:39:58.973325+00	Arjun	Patel	arjun.patel@email.com	+91-9876543214	Ahmedabad	India
36c608f8-d7ce-466a-9707-e3833bcbc7d1	2025-09-16 14:39:58.973325+00	Kavya	Singh	kavya.singh@email.com	+91-9876543215	Pune	India
244fb6ad-0dff-464d-bdc1-1673bcaf78a4	2025-09-16 14:39:58.973325+00	Rohan	Kumar	rohan.kumar@email.com	+91-9876543216	Chennai	India
f8591278-d6e8-4d7e-9490-90402ef117dd	2025-09-16 14:39:58.973325+00	Priya	Joshi	priya.joshi@email.com	+91-9876543217	Kolkata	India
ec2a1794-85c8-4e19-b05d-bbfaf323aa8f	2025-09-16 14:39:58.973325+00	Vikram	Agarwal	vikram.agarwal@email.com	+91-9876543218	Jaipur	India
18f4f048-b796-431f-9bc2-f210077e6ae1	2025-09-16 14:39:58.973325+00	Sneha	Nair	sneha.nair@email.com	+91-9876543219	Kochi	India
52c7bb94-33c2-4541-a32b-7fa256f46a00	2025-09-16 14:39:58.973325+00	Aditya	Malhotra	aditya.malhotra@email.com	+91-9876543220	Chandigarh	India
99ba309a-bc2d-48ec-816b-1c6b68655ee6	2025-09-16 14:39:58.973325+00	Riya	Chopra	riya.chopra@email.com	+91-9876543221	Gurgaon	India
296ec55f-0e24-4e58-8125-d1372fc01993	2025-09-16 14:39:58.973325+00	Karan	Mehta	karan.mehta@email.com	+91-9876543222	Surat	India
8546aab3-4b3b-414a-9952-05c38a788b74	2025-09-16 14:39:58.973325+00	Pooja	Bansal	pooja.bansal@email.com	+91-9876543223	Noida	India
1eae8c00-e968-4c35-8235-5fffdc6eb27f	2025-09-16 14:39:58.973325+00	Rahul	Saxena	rahul.saxena@email.com	+91-9876543224	Lucknow	India
a57d1f17-e5ae-4025-a808-c253576d156c	2025-09-16 14:39:58.973325+00	Neha	Kapoor	neha.kapoor@email.com	+91-9876543225	Indore	India
d764d583-71ae-47ef-898c-6ff3b08e4278	2025-09-16 14:39:58.973325+00	Siddharth	Rao	siddharth.rao@email.com	+91-9876543226	Bhopal	India
0256ad21-27de-49dd-9977-4467d959536e	2025-09-16 14:39:58.973325+00	Anjali	Tiwari	anjali.tiwari@email.com	+91-9876543227	Kanpur	India
9573cf37-7ff3-4f3a-ab76-133c3f0b3937	2025-09-16 14:39:58.973325+00	Harsh	Goyal	harsh.goyal@email.com	+91-9876543228	Nagpur	India
6f890ff6-45f8-4ca0-b23b-7f523caef224	2025-09-16 14:39:58.973325+00	Shreya	Pandey	shreya.pandey@email.com	+91-9876543229	Patna	India
39ba35e6-6973-48a2-afe3-707ac517ac6c	2025-09-16 14:39:58.973325+00	Nikhil	Shah	nikhil.shah@email.com	+91-9876543230	Vadodara	India
aa3facd7-bfdd-4690-a224-a2396d3b0f86	2025-09-16 14:39:58.973325+00	Tanvi	Mishra	tanvi.mishra@email.com	+91-9876543231	Agra	India
1cbf452c-f48f-4e5b-b9c1-ccf7832b7107	2025-09-16 14:39:58.973325+00	Abhishek	Jain	abhishek.jain@email.com	+91-9876543232	Nashik	India
a0579177-d069-446e-82f2-dac96fa562aa	2025-09-16 14:39:58.973325+00	Kritika	Sinha	kritika.sinha@email.com	+91-9876543233	Faridabad	India
5a3a891e-c5b0-48c2-a87b-e4d38a160c7f	2025-09-16 14:39:58.973325+00	Manish	Gupta	manish.gupta@email.com	+91-9876543234	Meerut	India
546be583-ab21-43a6-93b1-8a485aa86e78	2025-09-16 14:39:58.973325+00	Divya	Sharma	divya.sharma@email.com	+91-9876543235	Rajkot	India
b1901596-14c4-4ab5-a2d1-f0d039912e0a	2025-09-16 14:39:58.973325+00	Akash	Kumar	akash.kumar@email.com	+91-9876543236	Varanasi	India
7d42eab0-b025-4ea1-b216-9b407e20b892	2025-09-16 14:39:58.973325+00	Sakshi	Agarwal	sakshi.agarwal@email.com	+91-9876543237	Amritsar	India
33bfc096-24b7-4ed0-a572-6a8f52abe98a	2025-09-16 14:39:58.973325+00	Gaurav	Singh	gaurav.singh@email.com	+91-9876543238	Allahabad	India
c18b06cb-c89c-49dd-b660-ffe58882f141	2025-09-16 14:39:58.973325+00	Nisha	Verma	nisha.verma@email.com	+91-9876543239	Howrah	India
6a5180c2-49c1-43da-a603-04be17a8b8d1	2025-09-16 14:39:58.973325+00	Rohit	Patel	rohit.patel@email.com	+91-9876543240	Ranchi	India
8c227963-3ac3-4970-aada-68de252f90ef	2025-09-16 14:39:58.973325+00	Megha	Reddy	megha.reddy@email.com	+91-9876543241	Jabalpur	India
97fa810d-f771-4bb5-afa1-47bc27d9dfa4	2025-09-16 14:39:58.973325+00	Varun	Malhotra	varun.malhotra@email.com	+91-9876543242	Gwalior	India
0f6afd87-53c5-4b71-acc7-64906848f91c	2025-09-16 14:39:58.973325+00	Swati	Chopra	swati.chopra@email.com	+91-9876543243	Vijayawada	India
17bf03a6-e2f4-4df6-87d7-cd375f60e122	2025-09-16 14:39:58.973325+00	Deepak	Mehta	deepak.mehta@email.com	+91-9876543244	Jodhpur	India
191f7b62-d59e-4299-8c5f-98ac03ce8ac4	2025-09-16 14:39:58.973325+00	Preeti	Bansal	preeti.bansal@email.com	+91-9876543245	Madurai	India
ddf30cdd-a6e7-4f4b-a142-699239cf6a14	2025-09-16 14:39:58.973325+00	Suresh	Saxena	suresh.saxena@email.com	+91-9876543246	Raipur	India
0bc9d313-2ef8-4143-8f4a-91ae02bc69b9	2025-09-16 14:39:58.973325+00	Kavita	Kapoor	kavita.kapoor@email.com	+91-9876543247	Kota	India
e6318867-9535-4d9d-a3d2-44a3007f2563	2025-09-16 14:39:58.973325+00	Rajesh	Rao	rajesh.rao@email.com	+91-9876543248	Chandigarh	India
d5d65e1f-691a-4a55-9a37-4e142699b940	2025-09-16 14:39:58.973325+00	Sunita	Tiwari	sunita.tiwari@email.com	+91-9876543249	Guwahati	India
51fc5a59-66f5-4403-9b1d-efb18370f9ba	2025-09-16 14:39:58.973325+00	Amit	Goyal	amit.goyal@email.com	+91-9876543250	Thiruvananthapuram	India
36b424f7-d040-4dcb-8155-149e971e6eb7	2025-09-16 14:39:58.973325+00	Rekha	Pandey	rekha.pandey@email.com	+91-9876543251	Dehradun	India
27a2c9b5-0577-44fd-abdc-a7afc021fbc8	2025-09-16 14:39:58.973325+00	Vishal	Shah	vishal.shah@email.com	+91-9876543252	Shimla	India
cd21e727-a4fd-483d-8d4d-c53dd592aa5a	2025-09-16 14:39:58.973325+00	Geeta	Mishra	geeta.mishra@email.com	+91-9876543253	Jammu	India
2d92e6b3-0fe1-4a52-84ab-83dd3fb78d98	2025-09-16 14:39:58.973325+00	Manoj	Jain	manoj.jain@email.com	+91-9876543254	Udaipur	India
13849d98-3947-4545-9bfa-d6b782d52164	2025-09-16 14:39:58.973325+00	Seema	Sinha	seema.sinha@email.com	+91-9876543255	Mysore	India
5450c27a-768f-474c-9b4b-0fa5f88c69f2	2025-09-16 14:39:58.973325+00	Ravi	Gupta	ravi.gupta@email.com	+91-9876543256	Mangalore	India
80be85b0-2fd3-4499-9b0a-cc526dd50320	2025-09-16 14:39:58.973325+00	Lata	Sharma	lata.sharma@email.com	+91-9876543257	Coimbatore	India
721e0d5b-93b4-4681-a002-2d83944a8af9	2025-09-16 14:39:58.973325+00	Sunil	Kumar	sunil.kumar@email.com	+91-9876543258	Jalandhar	India
d8c78256-f443-4162-bfea-5205e6e8daf7	2025-09-16 14:39:58.973325+00	Meera	Agarwal	meera.agarwal@email.com	+91-9876543259	Bhubaneswar	India
\.
COPY public.order_items (id, created_at, order_id, product_id, quantity, unit_price) FROM stdin;
baa78118-6073-4076-b49f-9870fefc13e3	2025-09-16 14:39:58.973325+00	9769edea-85fa-462a-ab53-453c34c23e7c	961917d7-f4ca-4920-b8b2-a0ac2a5746d8	1	899.00
1d0dff66-7b53-4b93-b768-8950f07575ba	2025-09-16 14:39:58.973325+00	9769edea-85fa-462a-ab53-453c34c23e7c	bbd5455e-1bef-4d7c-8489-f308e30d65dc	1	599.00
9ade8900-ca1c-4e06-b1e1-b53cbd69e45d	2025-09-16 14:39:58.973325+00	dde97af5-4d87-46fd-9184-fd2f974c2035	0b58038b-b282-42a9-8f67-c378db47f919	1	399.00
c597eef0-140e-4992-837d-7c0f585f69b3	2025-09-16 14:39:58.973325+00	bd819ade-ff8d-4d0c-b751-5e6d3a3a2d2f	b8cd6649-bb9c-484e-9f3e-d5e9b2b8ad82	1	2299.00
6ce3be40-87fe-484f-8602-94aa110ad245	2025-09-16 14:39:58.973325+00	553a834f-46d5-4da7-bb43-9051ba844257	f0d5fa4f-e2bc-48b9-8a8d-73372f8675b2	1	649.00
822d4ea2-2964-4a72-bede-a63b62f38260	2025-09-16 14:39:58.973325+00	d0dc6b2d-26af-47a1-b02d-beebca31ec4d	d39c5ba3-8b58-43a6-95a5-353e6bdb79bf	1	1899.00
fbe8aad0-7638-4a7d-97b6-cc64096910c0	2025-09-16 14:39:58.973325+00	5ccc66b4-8dc6-4a28-932f-77e431b43e31	a72b258f-0a65-4027-a18d-588a729d59b8	1	799.00
bd225686-0a13-407f-ad4e-4e6908576be9	2025-09-16 14:39:58.973325+00	3a4be354-bbb1-453f-bf02-8633c0a3fcdf	24f46fdc-ff82-4822-8e25-d6698685d4b0	1	1299.00
247ac4cd-1b9b-46cd-81f9-22d21239d626	2025-09-16 14:39:58.973325+00	6c590b74-823e-49bc-95f3-c8a3b0fe93e2	96064247-12b7-49ec-8416-93758b52ff0e	1	549.00
0598b671-8ca5-4134-99d0-0fdaeeefcfe5	2025-09-16 14:39:58.973325+00	21528ae2-d839-4ada-a355-0e1f3ca031e7	cac1a3d2-7326-491c-a3c2-99efc4d999c9	1	1199.00
e4116ec5-6842-4486-ae6a-1b1011818aa9	2025-09-16 14:39:58.973325+00	f28afc20-1a3e-4269-bd2a-5680d28adb43	4c6834b0-8cf9-479f-a9b0-42737c63614a	1	899.00
6690fe26-2177-45c4-b46e-b43a792cf2ac	2025-09-16 14:39:58.973325+00	4a6e616a-8987-47aa-a233-5ee203ab08b1	0baa4d8c-0401-489b-b4b8-6ea79764727a	1	1599.00
9c556e8e-42bc-455c-a22a-15147e715f9c	2025-09-16 14:39:58.973325+00	4ccd8c07-00cb-4b5e-825b-9cc7a19fd622	3416e450-73d4-4e7e-a2f7-17b59bcc2ee0	1	749.00
faefed44-c74a-43ce-86fc-35cd960fe7a2	2025-09-16 14:39:58.973325+00	92cb769f-719c-443e-bb13-ea07360e9a79	6e31ecef-2c87-47f7-a546-7ee851a339af	1	2099.00
806fd34d-cfca-443a-a184-091b9e63b314	2025-09-16 14:39:58.973325+00	efdcf5b8-cb59-4d03-a127-90f3d014c70d	5848d463-3e95-4105-aa90-e636a0b2bd70	1	699.00
5f83bd98-428d-4335-aebf-5e043d24df52	2025-09-16 14:39:58.973325+00	af8bddf2-0797-4ccc-ad63-9dd4ff86f353	1b7187de-e494-4278-a270-4a679f1ca46b	1	1499.00
3707cfb5-c8df-42b2-9184-dbb50d9ccada	2025-09-16 14:39:58.973325+00	dd7297c1-c85b-4414-a11d-3806a5e63256	0c1c298f-018c-4361-ac04-11012e0f7b8d	1	849.00
45d768f4-0cb1-43dd-8334-7fc9416e6a32	2025-09-16 14:39:58.973325+00	ddc16de5-7371-403b-adb1-228ffee1ec21	05e54670-3521-4d7c-ab72-cbde7cc49e19	1	599.00
84e0cc8a-4e97-4f11-a889-01f1d8036362	2025-09-16 14:39:58.973325+00	5c4667fc-6d53-487a-b11a-9423802c15f9	a99fb613-753d-4b61-8d73-fc33422f5aff	1	1099.00
322c2c40-6e82-421e-90c6-5db46a98a732	2025-09-16 14:39:58.973325+00	a70cfb04-891a-47b4-9cb8-347f586ce20d	0290523a-0d10-4713-918b-75bc9e78134d	1	449.00
259e8315-8dd9-4b3d-835f-2c4d4d3a5ee2	2025-09-16 14:39:58.973325+00	a282b995-a2a5-4c42-96d8-548e2806caf8	1e9b4114-5639-452e-8c66-24ef3763814b	1	1399.00
00df88d0-1285-4f52-ae94-1619e336c8e6	2025-09-16 14:39:58.973325+00	cab28784-9fa6-4c95-afeb-97e405b6da73	2a07c099-a851-4503-a6cc-230e0efe3c51	1	579.00
70bf17f2-dfb3-49b2-8c9e-a4172acd3149	2025-09-16 14:39:58.973325+00	d6b93a7a-ad16-4cd4-bbfd-4ccc955d6326	f8351e7f-5942-4cbf-a37a-a66eb25fdde1	1	899.00
18271de2-c3d5-43b8-8f30-4d7149375f66	2025-09-16 14:39:58.973325+00	aa3a8312-fb53-474a-8bad-0a4398d6a037	c360481b-122c-439c-b64c-2ea5d3b3d0bf	1	1299.00
b3656ec0-9de6-4ae6-9cfa-f5d1c74d16ac	2025-09-16 14:39:58.973325+00	ae675d15-babf-4eb8-9c2f-a089fe7cc81a	f58c852e-c445-48c2-873b-55cbd3d33c08	1	649.00
8896c039-aae6-4eb1-9b83-f33f9df7be3d	2025-09-16 14:39:58.973325+00	2a115be6-bd92-4f65-852f-e591551dfef6	9b28c2ba-8f22-42be-b53e-e0330038143e	1	799.00
b1b03f7d-3243-443f-8668-1a1c23db9987	2025-09-16 14:39:58.973325+00	59636de5-4e34-421f-8ead-ca495982b604	ecfadee6-0b01-40e2-a55e-c8f7743904ff	1	1199.00
d3c46bf8-c911-45e1-b1c0-f081c36fcf94	2025-09-16 14:39:58.973325+00	1acfcf76-7c89-45d1-9195-7c34b3b8b229	88da32b4-8dda-42b9-af59-a70f6defaacc	1	549.00
49ea2892-0d67-4ee6-92a1-5f40565498bf	2025-09-16 14:39:58.973325+00	a706d441-6b73-44e4-9dc6-dc3e19ddc3ef	b8cd6649-bb9c-484e-9f3e-d5e9b2b8ad82	1	2299.00
acb97504-6573-4d47-a312-35edf2a87b0c	2025-09-16 14:39:58.973325+00	3d96e620-db2d-4943-8a58-258be4c6b941	8f7af3fa-1991-4812-b9be-7d07dbd56d92	1	699.00
b1914838-13f4-4063-a202-b14f4145d4a2	2025-09-16 14:39:58.973325+00	3d96e620-db2d-4943-8a58-258be4c6b941	312dd379-e5db-4e06-84ed-98072360bf37	1	349.00
cdb756ee-e594-4e77-8d25-c2da4a9d2112	2025-09-16 14:39:58.973325+00	18762721-3fe5-426e-b4de-fa2e1a57aeeb	0baa4d8c-0401-489b-b4b8-6ea79764727a	1	1599.00
f81ba95e-ce84-4323-9e97-1ba068ab62e0	2025-09-16 14:39:58.973325+00	aa1927ce-2137-44c6-85d8-c341cdd45956	59794b04-7237-47b3-b5d9-2270bc66d7c3	1	749.00
d35d498e-c192-48e6-a411-1c823ce74b78	2025-09-16 14:39:58.973325+00	f8a50cbe-f378-4ea3-983b-8fca52806cd1	ba4900d8-5ea6-458f-a5b0-63e8d58f9ef6	1	1099.00
7db60fed-e155-4c52-9c19-56a671e3070a	2025-09-16 14:39:58.973325+00	c03c3510-b982-4907-aaac-9d745d50d2e3	9c2369d8-0d8c-4a31-87f0-179ceedfeeaa	1	599.00
4d01eb12-fb3f-4df0-a996-52e12f9d7c7b	2025-09-16 14:39:58.973325+00	31c0215b-abd2-413f-803f-caa6e5a16973	2eb9ef57-b02b-4de6-b1c7-a167dc5f9de7	1	1299.00
04c5c2f0-dbe1-4ce7-af12-479aca1c2b97	2025-09-16 14:39:58.973325+00	3159e092-853f-4ac4-90e5-22f9957d8f7a	47ecf47e-a7d7-4229-826b-5d52ef391921	1	759.00
4d289667-a4ac-4d0b-aa6b-41831939d337	2025-09-16 14:39:58.973325+00	b95236a3-984c-40a0-a2e9-74a83afcc591	32d1f085-b0cc-431d-af48-800ee46f585f	1	799.00
d39c4a36-f2c6-4a48-a2df-8646c666b8b3	2025-09-16 14:39:58.973325+00	b95236a3-984c-40a0-a2e9-74a83afcc591	4a0e9b05-5bc3-45c7-9895-32173e6fe5f7	1	429.00
a88a9ae4-465c-45eb-878c-f102494145f9	2025-09-16 14:39:58.973325+00	f267e649-40b0-4dc1-b347-6a83efcb8aeb	acb3a12c-8541-47bd-8c8a-50514818cfed	1	699.00
3f677cf9-d88c-433d-bd1b-35b9b85a10ff	2025-09-16 14:39:58.973325+00	d1bfa7ba-5ef2-4e33-a3dd-1921fd8c2bff	0baa4d8c-0401-489b-b4b8-6ea79764727a	1	1599.00
267e2bcf-fdb9-438c-b5ec-979691f0d6b2	2025-09-16 14:39:58.973325+00	83d31fc3-e68a-47cb-9b3a-3e1440ff4c5e	770feb6f-4863-4b2c-9ec2-8d45206eb15d	1	649.00
da794909-0f15-41a3-8139-6a7b15c7e4dd	2025-09-16 14:39:58.973325+00	6d88dc85-68b4-4c36-bc8b-b63656442690	6e31ecef-2c87-47f7-a546-7ee851a339af	1	2099.00
62f7555e-85bd-4fc8-80c0-695cf2350faf	2025-09-16 14:39:58.973325+00	d3a20028-f01c-42ff-b584-194d8686d66a	fb163928-68c8-4b2a-91e7-5c3b56797efa	1	799.00
70fca5e8-a895-4be9-afe5-771c672b5c9f	2025-09-16 14:39:58.973325+00	c1158b5e-dfb5-4111-b8a0-54d540bc699a	1e9b4114-5639-452e-8c66-24ef3763814b	1	1399.00
b4820bae-4d66-43a1-b743-5f958a504650	2025-09-16 14:39:58.973325+00	f5cb6ef5-b2ff-4390-8a04-78980ab8bef4	4251b635-418c-4929-adac-b3b94a651126	1	579.00
f38e148e-a375-4e40-8a95-1ffb93447ecb	2025-09-16 14:39:58.973325+00	e2975452-5fa4-44e5-aecd-da98ee141cb9	c360481b-122c-439c-b64c-2ea5d3b3d0bf	1	1299.00
8c85883c-0d55-48f5-bb46-9ffb0b64110f	2025-09-16 14:39:58.973325+00	e4965a9b-f40a-4682-b710-0333f57d5c75	d58922d3-aa01-43b1-82a0-078052774ee1	1	649.00
ef19986c-567f-4aeb-b430-8d308c3f0817	2025-09-16 14:39:58.973325+00	aa8d9c54-5d93-4492-8817-9ac915c0b1dd	419cdb4c-c355-4cab-b12f-26aa51d5676f	1	799.00
dd3dc2b5-429e-48ca-81b0-e318f8f958c2	2025-09-16 14:39:58.973325+00	35b55b31-9a91-4760-b9c6-ba3ccf2b6c62	c1560635-edad-462d-895a-95436df51f6f	1	899.00
e6e2f0d0-b8db-4f15-bfeb-c4ab479c0259	2025-09-16 14:39:58.973325+00	35b55b31-9a91-4760-b9c6-ba3ccf2b6c62	05f4dfd6-9da7-4435-8aff-00101fe2f518	1	529.00
8bb6fd68-3210-4fbf-90c1-fc717b62fd19	2025-09-16 14:39:58.973325+00	65be41e6-3a6f-42d9-ab20-b6bd39c852af	0be32d13-600a-4c77-88b9-7e1828c94293	1	549.00
b6aa073b-e7c6-4fcb-859f-60b60e0145c8	2025-09-16 14:39:58.973325+00	3051c099-bf3c-45ba-bc13-a22c8ce81f04	b8cd6649-bb9c-484e-9f3e-d5e9b2b8ad82	1	2299.00
bb6fcc91-dc67-43af-a690-89c15d453a3f	2025-09-16 14:39:58.973325+00	98673f89-f89e-4f4b-a63f-ca4f5ae8a757	da3c7a1b-7c40-494c-b16e-cd2e30246df6	1	1099.00
\.
COPY public.orders (id, created_at, customer_id, status, subtotal, tax, total) FROM stdin;
9769edea-85fa-462a-ab53-453c34c23e7c	2025-08-17 14:39:58.973325+00	9f58de6d-d52a-4110-95fd-714592156042	fulfilled	1398.00	251.64	1649.64
dde97af5-4d87-46fd-9184-fd2f974c2035	2025-08-22 14:39:58.973325+00	4b5a2ee0-06a4-47b9-9984-d1f1870bad77	fulfilled	499.00	89.82	588.82
bd819ade-ff8d-4d0c-b751-5e6d3a3a2d2f	2025-08-27 14:39:58.973325+00	6261d062-7930-4814-aa0b-7eb3d904dd66	paid	2299.00	413.82	2712.82
553a834f-46d5-4da7-bb43-9051ba844257	2025-09-01 14:39:58.973325+00	ab8498c1-ae24-41dc-90d8-71fb93508891	pending	649.00	116.82	765.82
d0dc6b2d-26af-47a1-b02d-beebca31ec4d	2025-09-06 14:39:58.973325+00	a377a53a-2642-4a23-8c7a-adceaa1bc3f4	fulfilled	1899.00	341.82	2240.82
5ccc66b4-8dc6-4a28-932f-77e431b43e31	2025-09-08 14:39:58.973325+00	36c608f8-d7ce-466a-9707-e3833bcbc7d1	paid	799.00	143.82	942.82
3a4be354-bbb1-453f-bf02-8633c0a3fcdf	2025-09-09 14:39:58.973325+00	244fb6ad-0dff-464d-bdc1-1673bcaf78a4	cancelled	1299.00	233.82	1532.82
6c590b74-823e-49bc-95f3-c8a3b0fe93e2	2025-09-10 14:39:58.973325+00	f8591278-d6e8-4d7e-9490-90402ef117dd	fulfilled	549.00	98.82	647.82
21528ae2-d839-4ada-a355-0e1f3ca031e7	2025-09-11 14:39:58.973325+00	ec2a1794-85c8-4e19-b05d-bbfaf323aa8f	paid	1199.00	215.82	1414.82
f28afc20-1a3e-4269-bd2a-5680d28adb43	2025-09-12 14:39:58.973325+00	18f4f048-b796-431f-9bc2-f210077e6ae1	pending	899.00	161.82	1060.82
4a6e616a-8987-47aa-a233-5ee203ab08b1	2025-09-13 14:39:58.973325+00	52c7bb94-33c2-4541-a32b-7fa256f46a00	fulfilled	1599.00	287.82	1886.82
4ccd8c07-00cb-4b5e-825b-9cc7a19fd622	2025-09-14 14:39:58.973325+00	99ba309a-bc2d-48ec-816b-1c6b68655ee6	paid	749.00	134.82	883.82
92cb769f-719c-443e-bb13-ea07360e9a79	2025-09-15 14:39:58.973325+00	296ec55f-0e24-4e58-8125-d1372fc01993	pending	2099.00	377.82	2476.82
efdcf5b8-cb59-4d03-a127-90f3d014c70d	2025-09-16 14:39:58.973325+00	8546aab3-4b3b-414a-9952-05c38a788b74	fulfilled	699.00	125.82	824.82
af8bddf2-0797-4ccc-ad63-9dd4ff86f353	2025-08-12 14:39:58.973325+00	1eae8c00-e968-4c35-8235-5fffdc6eb27f	paid	1499.00	269.82	1768.82
dd7297c1-c85b-4414-a11d-3806a5e63256	2025-08-15 14:39:58.973325+00	a57d1f17-e5ae-4025-a808-c253576d156c	fulfilled	849.00	152.82	1001.82
ddc16de5-7371-403b-adb1-228ffee1ec21	2025-08-19 14:39:58.973325+00	d764d583-71ae-47ef-898c-6ff3b08e4278	cancelled	599.00	107.82	706.82
5c4667fc-6d53-487a-b11a-9423802c15f9	2025-08-21 14:39:58.973325+00	0256ad21-27de-49dd-9977-4467d959536e	paid	1099.00	197.82	1296.82
a70cfb04-891a-47b4-9cb8-347f586ce20d	2025-08-23 14:39:58.973325+00	9573cf37-7ff3-4f3a-ab76-133c3f0b3937	fulfilled	449.00	80.82	529.82
a282b995-a2a5-4c42-96d8-548e2806caf8	2025-08-25 14:39:58.973325+00	6f890ff6-45f8-4ca0-b23b-7f523caef224	pending	1399.00	251.82	1650.82
cab28784-9fa6-4c95-afeb-97e405b6da73	2025-08-29 14:39:58.973325+00	39ba35e6-6973-48a2-afe3-707ac517ac6c	paid	579.00	104.22	683.22
d6b93a7a-ad16-4cd4-bbfd-4ccc955d6326	2025-08-31 14:39:58.973325+00	aa3facd7-bfdd-4690-a224-a2396d3b0f86	fulfilled	899.00	161.82	1060.82
aa3a8312-fb53-474a-8bad-0a4398d6a037	2025-09-02 14:39:58.973325+00	1cbf452c-f48f-4e5b-b9c1-ccf7832b7107	paid	1299.00	233.82	1532.82
ae675d15-babf-4eb8-9c2f-a089fe7cc81a	2025-09-04 14:39:58.973325+00	a0579177-d069-446e-82f2-dac96fa562aa	pending	649.00	116.82	765.82
2a115be6-bd92-4f65-852f-e591551dfef6	2025-09-05 14:39:58.973325+00	5a3a891e-c5b0-48c2-a87b-e4d38a160c7f	fulfilled	799.00	143.82	942.82
59636de5-4e34-421f-8ead-ca495982b604	2025-09-07 14:39:58.973325+00	546be583-ab21-43a6-93b1-8a485aa86e78	paid	1199.00	215.82	1414.82
1acfcf76-7c89-45d1-9195-7c34b3b8b229	2025-09-08 14:39:58.973325+00	b1901596-14c4-4ab5-a2d1-f0d039912e0a	cancelled	549.00	98.82	647.82
a706d441-6b73-44e4-9dc6-dc3e19ddc3ef	2025-09-09 14:39:58.973325+00	7d42eab0-b025-4ea1-b216-9b407e20b892	fulfilled	2299.00	413.82	2712.82
3d96e620-db2d-4943-8a58-258be4c6b941	2025-09-10 14:39:58.973325+00	33bfc096-24b7-4ed0-a572-6a8f52abe98a	paid	899.00	161.82	1060.82
18762721-3fe5-426e-b4de-fa2e1a57aeeb	2025-09-11 14:39:58.973325+00	c18b06cb-c89c-49dd-b660-ffe58882f141	pending	1599.00	287.82	1886.82
aa1927ce-2137-44c6-85d8-c341cdd45956	2025-09-12 14:39:58.973325+00	6a5180c2-49c1-43da-a603-04be17a8b8d1	fulfilled	749.00	134.82	883.82
f8a50cbe-f378-4ea3-983b-8fca52806cd1	2025-09-13 14:39:58.973325+00	8c227963-3ac3-4970-aada-68de252f90ef	paid	1099.00	197.82	1296.82
c03c3510-b982-4907-aaac-9d745d50d2e3	2025-09-14 14:39:58.973325+00	97fa810d-f771-4bb5-afa1-47bc27d9dfa4	pending	599.00	107.82	706.82
31c0215b-abd2-413f-803f-caa6e5a16973	2025-09-15 14:39:58.973325+00	0f6afd87-53c5-4b71-acc7-64906848f91c	fulfilled	1299.00	233.82	1532.82
3159e092-853f-4ac4-90e5-22f9957d8f7a	2025-09-16 14:39:58.973325+00	17bf03a6-e2f4-4df6-87d7-cd375f60e122	paid	849.00	152.82	1001.82
b95236a3-984c-40a0-a2e9-74a83afcc591	2025-08-07 14:39:58.973325+00	191f7b62-d59e-4299-8c5f-98ac03ce8ac4	pending	1199.00	215.82	1414.82
f267e649-40b0-4dc1-b347-6a83efcb8aeb	2025-08-09 14:39:58.973325+00	ddf30cdd-a6e7-4f4b-a142-699239cf6a14	fulfilled	699.00	125.82	824.82
d1bfa7ba-5ef2-4e33-a3dd-1921fd8c2bff	2025-08-11 14:39:58.973325+00	0bc9d313-2ef8-4143-8f4a-91ae02bc69b9	paid	1599.00	287.82	1886.82
83d31fc3-e68a-47cb-9b3a-3e1440ff4c5e	2025-08-13 14:39:58.973325+00	e6318867-9535-4d9d-a3d2-44a3007f2563	cancelled	749.00	134.82	883.82
6d88dc85-68b4-4c36-bc8b-b63656442690	2025-08-14 14:39:58.973325+00	d5d65e1f-691a-4a55-9a37-4e142699b940	fulfilled	2099.00	377.82	2476.82
d3a20028-f01c-42ff-b584-194d8686d66a	2025-08-16 14:39:58.973325+00	51fc5a59-66f5-4403-9b1d-efb18370f9ba	paid	899.00	161.82	1060.82
c1158b5e-dfb5-4111-b8a0-54d540bc699a	2025-08-18 14:39:58.973325+00	36b424f7-d040-4dcb-8155-149e971e6eb7	pending	1399.00	251.82	1650.82
f5cb6ef5-b2ff-4390-8a04-78980ab8bef4	2025-08-20 14:39:58.973325+00	27a2c9b5-0577-44fd-abdc-a7afc021fbc8	fulfilled	579.00	104.22	683.22
e2975452-5fa4-44e5-aecd-da98ee141cb9	2025-08-24 14:39:58.973325+00	cd21e727-a4fd-483d-8d4d-c53dd592aa5a	paid	1299.00	233.82	1532.82
e4965a9b-f40a-4682-b710-0333f57d5c75	2025-08-26 14:39:58.973325+00	2d92e6b3-0fe1-4a52-84ab-83dd3fb78d98	pending	649.00	116.82	765.82
aa8d9c54-5d93-4492-8817-9ac915c0b1dd	2025-08-28 14:39:58.973325+00	13849d98-3947-4545-9bfa-d6b782d52164	fulfilled	799.00	143.82	942.82
35b55b31-9a91-4760-b9c6-ba3ccf2b6c62	2025-08-30 14:39:58.973325+00	5450c27a-768f-474c-9b4b-0fa5f88c69f2	paid	1199.00	215.82	1414.82
65be41e6-3a6f-42d9-ab20-b6bd39c852af	2025-09-03 14:39:58.973325+00	80be85b0-2fd3-4499-9b0a-cc526dd50320	cancelled	549.00	98.82	647.82
3051c099-bf3c-45ba-bc13-a22c8ce81f04	2025-09-07 14:39:58.973325+00	721e0d5b-93b4-4681-a002-2d83944a8af9	fulfilled	2299.00	413.82	2712.82
98673f89-f89e-4f4b-a63f-ca4f5ae8a757	2025-09-11 14:39:58.973325+00	d8c78256-f443-4162-bfea-5205e6e8daf7	paid	899.00	161.82	1060.82
\.
COPY public.products (id, created_at, name, sku, category, form, brand, price, inventory, status, image_url, rating, reviews, description) FROM stdin;
bbd5455e-1bef-4d7c-8489-f308e30d65dc	2025-09-16 14:39:58.973325+00	Vitamin D3 2000 IU	VITD-2001	Vitamins	Capsule	Health360	599.00	120	active	/images/health360/vitamins.jpg	4.70	89	High-potency Vitamin D3 for bone health and immunity
0290523a-0d10-4713-918b-75bc9e78134d	2025-09-16 14:39:58.973325+00	Vitamin B12 Methylcobalamin	VITB-2002	Vitamins	Tablet	WellBeing	449.00	95	active	/images/health360/vitamins.jpg	4.50	67	Bioactive B12 for energy and nervous system support
a72b258f-0a65-4027-a18d-588a729d59b8	2025-09-16 14:39:58.973325+00	Multivitamin Complete	MULT-2003	Vitamins	Tablet	Vitalix	799.00	80	active	/images/health360/vitamins.jpg	4.30	156	Complete daily multivitamin with 25 essential nutrients
0b58038b-b282-42a9-8f67-c378db47f919	2025-09-16 14:39:58.973325+00	Vitamin C 1000mg	VITC-2004	Vitamins	Capsule	Health360	399.00	150	active	/images/health360/vitamins.jpg	4.60	203	High-dose Vitamin C for immune system support
05f4dfd6-9da7-4435-8aff-00101fe2f518	2025-09-16 14:39:58.973325+00	Vitamin E 400 IU	VITE-2005	Vitamins	Softgel	NutriMax	529.00	75	active	/images/health360/vitamins.jpg	4.40	45	Natural Vitamin E for antioxidant protection
f0d5fa4f-e2bc-48b9-8a8d-73372f8675b2	2025-09-16 14:39:58.973325+00	Calcium Magnesium Zinc	CALZ-2006	Minerals	Tablet	BoneStrong	649.00	110	active	/images/health360/minerals.jpg	4.50	78	Essential minerals for bone and muscle health
2fe116d6-dd9d-4c1b-b0c9-27cec2763d09	2025-09-16 14:39:58.973325+00	Iron Bisglycinate	IRON-2007	Minerals	Capsule	Health360	459.00	85	active	/images/health360/minerals.jpg	4.20	34	Gentle iron supplement for energy and blood health
2a07c099-a851-4503-a6cc-230e0efe3c51	2025-09-16 14:39:58.973325+00	Magnesium Glycinate	MAGN-2008	Minerals	Capsule	WellBeing	579.00	90	active	/images/health360/minerals.jpg	4.60	92	Highly absorbable magnesium for muscle and nerve function
312dd379-e5db-4e06-84ed-98072360bf37	2025-09-16 14:39:58.973325+00	Zinc Picolinate	ZINC-2009	Minerals	Capsule	Vitalix	349.00	125	active	/images/health360/minerals.jpg	4.30	56	Bioavailable zinc for immune support and wound healing
4a0e9b05-5bc3-45c7-9895-32173e6fe5f7	2025-09-16 14:39:58.973325+00	Potassium Citrate	POTA-2010	Minerals	Capsule	NutriMax	429.00	70	active	/images/health360/minerals.jpg	4.10	23	Essential electrolyte for heart and muscle function
961917d7-f4ca-4920-b8b2-a0ac2a5746d8	2025-09-16 14:39:58.973325+00	Omega-3 Fish Oil 1000mg	OMEG-2011	Omega-3	Softgel	OceanPure	899.00	60	active	/images/health360/omega-3.jpg	4.80	145	Premium fish oil with EPA and DHA for heart and brain health
24f46fdc-ff82-4822-8e25-d6698685d4b0	2025-09-16 14:39:58.973325+00	Krill Oil Antarctic	KRIL-2012	Omega-3	Softgel	PolarHealth	1299.00	45	active	/images/health360/omega-3.jpg	4.70	67	Superior absorption krill oil with astaxanthin
a99fb613-753d-4b61-8d73-fc33422f5aff	2025-09-16 14:39:58.973325+00	Algae Omega-3 Vegan	ALGA-2013	Omega-3	Capsule	PlantPower	1099.00	55	active	/images/health360/omega-3.jpg	4.50	89	Plant-based omega-3 from algae, perfect for vegans
3416e450-73d4-4e7e-a2f7-17b59bcc2ee0	2025-09-16 14:39:58.973325+00	Cod Liver Oil	CODL-2014	Omega-3	Softgel	NordicHealth	749.00	80	active	/images/health360/omega-3.jpg	4.40	112	Traditional cod liver oil with vitamins A and D
88da32b4-8dda-42b9-af59-a70f6defaacc	2025-09-16 14:39:58.973325+00	Flaxseed Oil	FLAX-2015	Omega-3	Softgel	PlantPower	549.00	95	active	/images/health360/omega-3.jpg	4.20	78	Plant-based omega-3 from organic flaxseeds
cac1a3d2-7326-491c-a3c2-99efc4d999c9	2025-09-16 14:39:58.973325+00	Probiotic 50 Billion CFU	PROB-2016	Probiotics	Capsule	GutHealth	1199.00	40	active	/images/health360/probiotics.jpg	4.60	134	High-potency probiotic with 10 strains for digestive health
8f7af3fa-1991-4812-b9be-7d07dbd56d92	2025-09-16 14:39:58.973325+00	Probiotic Kids Chewable	PROBK-2017	Probiotics	Chewable	KidsVital	699.00	65	active	/images/health360/probiotics.jpg	4.50	89	Kid-friendly probiotic chewables with natural fruit flavor
0c1c298f-018c-4361-ac04-11012e0f7b8d	2025-09-16 14:39:58.973325+00	Prebiotic Fiber Complex	PREB-2018	Probiotics	Powder	GutHealth	849.00	50	active	/images/health360/probiotics.jpg	4.30	56	Prebiotic fiber blend to support beneficial gut bacteria
47ecf47e-a7d7-4229-826b-5d52ef391921	2025-09-16 14:39:58.973325+00	Digestive Enzymes	DIGE-2019	Probiotics	Capsule	DigestWell	759.00	75	active	/images/health360/probiotics.jpg	4.40	67	Comprehensive enzyme blend for better digestion
05e54670-3521-4d7c-ab72-cbde7cc49e19	2025-09-16 14:39:58.973325+00	Lactobacillus Acidophilus	LACT-2020	Probiotics	Capsule	GutHealth	599.00	85	active	/images/health360/probiotics.jpg	4.20	45	Single-strain probiotic for digestive balance
f58c852e-c445-48c2-873b-55cbd3d33c08	2025-09-16 14:39:58.973325+00	Turmeric Curcumin	TURM-2021	Herbal	Capsule	AyurVeda	649.00	100	active	/images/health360/herbal.jpg	4.70	178	Organic turmeric with black pepper for enhanced absorption
9b28c2ba-8f22-42be-b53e-e0330038143e	2025-09-16 14:39:58.973325+00	Ashwagandha KSM-66	ASHW-2022	Herbal	Capsule	StressRelief	799.00	70	active	/images/health360/herbal.jpg	4.60	145	Clinically studied ashwagandha for stress and energy
4c6834b0-8cf9-479f-a9b0-42737c63614a	2025-09-16 14:39:58.973325+00	Ginseng Panax	GINS-2023	Herbal	Capsule	EnergyBoost	899.00	55	active	/images/health360/herbal.jpg	4.50	89	Premium Korean ginseng for energy and vitality
96064247-12b7-49ec-8416-93758b52ff0e	2025-09-16 14:39:58.973325+00	Echinacea Purple Cone	ECHI-2024	Herbal	Capsule	ImmuneShield	549.00	90	active	/images/health360/herbal.jpg	4.30	67	Traditional herb for immune system support
5848d463-3e95-4105-aa90-e636a0b2bd70	2025-09-16 14:39:58.973325+00	Ginkgo Biloba	GINK-2025	Herbal	Capsule	BrainBoost	699.00	80	active	/images/health360/herbal.jpg	4.40	78	Standardized extract for cognitive function and circulation
b8cd6649-bb9c-484e-9f3e-d5e9b2b8ad82	2025-09-16 14:39:58.973325+00	Whey Protein Isolate	WHEY-2026	Protein	Powder	MuscleFuel	2299.00	35	active	/images/health360/protein.jpg	4.80	234	Pure whey protein isolate with 25g protein per serving
d39c5ba3-8b58-43a6-95a5-353e6bdb79bf	2025-09-16 14:39:58.973325+00	Plant Protein Blend	PLAN-2027	Protein	Powder	PlantPower	1899.00	45	active	/images/health360/protein.jpg	4.50	156	Organic pea, rice, and hemp protein blend
0baa4d8c-0401-489b-b4b8-6ea79764727a	2025-09-16 14:39:58.973325+00	Collagen Peptides	COLL-2028	Protein	Powder	BeautyHealth	1599.00	60	active	/images/health360/protein.jpg	4.60	189	Hydrolyzed collagen for skin, hair, and joint health
6e31ecef-2c87-47f7-a546-7ee851a339af	2025-09-16 14:39:58.973325+00	Casein Protein	CASE-2029	Protein	Powder	MuscleFuel	2099.00	30	active	/images/health360/protein.jpg	4.40	98	Slow-digesting protein perfect for nighttime recovery
2eb9ef57-b02b-4de6-b1c7-a167dc5f9de7	2025-09-16 14:39:58.973325+00	BCAA Amino Acids	BCAA-2030	Protein	Powder	WorkoutMax	1299.00	70	active	/images/health360/protein.jpg	4.30	123	Branched-chain amino acids for muscle recovery
1b7187de-e494-4278-a270-4a679f1ca46b	2025-09-16 14:39:58.973325+00	CoQ10 Ubiquinol	COQ10-2031	Antioxidants	Softgel	HeartHealth	1499.00	40	active	/images/health360/antioxidants.jpg	4.70	89	Active form of CoQ10 for heart and cellular energy
32d1f085-b0cc-431d-af48-800ee46f585f	2025-09-16 14:39:58.973325+00	Alpha Lipoic Acid	ALPH-2032	Antioxidants	Capsule	CellProtect	799.00	65	active	/images/health360/antioxidants.jpg	4.40	56	Universal antioxidant for blood sugar and nerve support
ecfadee6-0b01-40e2-a55e-c8f7743904ff	2025-09-16 14:39:58.973325+00	Resveratrol	RESV-2033	Antioxidants	Capsule	AntiAge	1199.00	50	active	/images/health360/antioxidants.jpg	4.50	67	Powerful antioxidant from red wine extract
770feb6f-4863-4b2c-9ec2-8d45206eb15d	2025-09-16 14:39:58.973325+00	Green Tea Extract	GREE-2034	Antioxidants	Capsule	MetaBoost	649.00	85	active	/images/health360/antioxidants.jpg	4.30	78	Standardized EGCG for metabolism and antioxidant support
59794b04-7237-47b3-b5d9-2270bc66d7c3	2025-09-16 14:39:58.973325+00	Grape Seed Extract	GRAP-2035	Antioxidants	Capsule	CellProtect	749.00	75	active	/images/health360/antioxidants.jpg	4.20	45	Proanthocyanidins for cardiovascular and skin health
d78e2e64-8ddc-43cd-8930-bde2fa1c0f3d	2025-09-16 14:39:58.973325+00	Melatonin 3mg	MELA-2036	Sleep	Tablet	SleepWell	449.00	110	active	/images/health360/sleep.jpg	4.50	167	Natural sleep hormone for better sleep quality
9c2369d8-0d8c-4a31-87f0-179ceedfeeaa	2025-09-16 14:39:58.973325+00	Valerian Root	VALE-2037	Sleep	Capsule	NightRest	599.00	80	active	/images/health360/sleep.jpg	4.30	89	Traditional herb for relaxation and sleep support
acb3a12c-8541-47bd-8c8a-50514818cfed	2025-09-16 14:39:58.973325+00	L-Theanine	THEA-2038	Sleep	Capsule	CalmMind	699.00	70	active	/images/health360/sleep.jpg	4.40	78	Amino acid for relaxation without drowsiness
d58922d3-aa01-43b1-82a0-078052774ee1	2025-09-16 14:39:58.973325+00	Magnesium Glycinate Sleep	MAGS-2039	Sleep	Capsule	SleepWell	649.00	90	active	/images/health360/sleep.jpg	4.60	123	Calming magnesium formula for better sleep
4251b635-418c-4929-adac-b3b94a651126	2025-09-16 14:39:58.973325+00	GABA 750mg	GABA-2040	Sleep	Capsule	NightRest	579.00	85	active	/images/health360/sleep.jpg	4.20	56	Neurotransmitter for relaxation and stress relief
0be32d13-600a-4c77-88b9-7e1828c94293	2025-09-16 14:39:58.973325+00	Biotin 10000mcg	BIOT-2041	Beauty	Capsule	BeautyHealth	549.00	95	active	/images/health360/beauty.jpg	4.50	134	High-potency biotin for hair, skin, and nails
f8351e7f-5942-4cbf-a37a-a66eb25fdde1	2025-09-16 14:39:58.973325+00	Hair Skin Nails Complex	HAIR-2042	Beauty	Capsule	GlowVital	899.00	60	active	/images/health360/beauty.jpg	4.40	89	Complete beauty formula with biotin, collagen, and vitamins
ba4900d8-5ea6-458f-a5b0-63e8d58f9ef6	2025-09-16 14:39:58.973325+00	Hyaluronic Acid	HYAL-2043	Beauty	Capsule	SkinGlow	1099.00	45	active	/images/health360/beauty.jpg	4.60	67	Hydrating compound for skin moisture and elasticity
419cdb4c-c355-4cab-b12f-26aa51d5676f	2025-09-16 14:39:58.973325+00	Keratin Complex	KERA-2044	Beauty	Capsule	HairStrong	799.00	70	active	/images/health360/beauty.jpg	4.30	78	Protein complex for stronger hair and nails
3a832529-654c-4b73-8d70-c8c00fe8d6f3	2025-09-16 14:39:58.973325+00	Silica Bamboo Extract	SILI-2045	Beauty	Capsule	BeautyHealth	649.00	80	active	/images/health360/beauty.jpg	4.20	45	Natural silica for hair, skin, and nail health
c360481b-122c-439c-b64c-2ea5d3b3d0bf	2025-09-16 14:39:58.973325+00	Glucosamine Chondroitin	GLUC-2046	Joint Health	Capsule	JointFlex	1299.00	55	active	/images/health360/joints.jpg	4.70	156	Classic joint support formula for cartilage health
fb163928-68c8-4b2a-91e7-5c3b56797efa	2025-09-16 14:39:58.973325+00	MSM Methylsulfonylmethane	MSM-2047	Joint Health	Capsule	FlexiJoint	799.00	75	active	/images/health360/joints.jpg	4.40	89	Sulfur compound for joint flexibility and comfort
c1560635-edad-462d-895a-95436df51f6f	2025-09-16 14:39:58.973325+00	Boswellia Serrata	BOSW-2048	Joint Health	Capsule	JointCare	899.00	65	active	/images/health360/joints.jpg	4.50	67	Ayurvedic herb for joint health and mobility
da3c7a1b-7c40-494c-b16e-cd2e30246df6	2025-09-16 14:39:58.973325+00	Curcumin Joint Formula	CURC-2049	Joint Health	Capsule	FlexiJoint	1099.00	50	active	/images/health360/joints.jpg	4.60	78	Turmeric extract specifically formulated for joint support
1e9b4114-5639-452e-8c66-24ef3763814b	2025-09-16 14:39:58.973325+00	Type II Collagen	COL2-2050	Joint Health	Capsule	JointFlex	1399.00	40	active	/images/health360/joints.jpg	4.80	123	Undenatured collagen for joint cartilage support
\.
ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_email_key UNIQUE (email);


--
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);


--
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: products products_sku_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_sku_key UNIQUE (sku);
ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id);


--
-- Name: order_items order_items_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- Name: orders orders_customer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(id);

ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous read access to customers" ON public.customers FOR SELECT TO anon USING (true);
CREATE POLICY "Allow anonymous insert access to customers" ON public.customers FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow anonymous update access to customers" ON public.customers FOR UPDATE TO anon USING (true);
CREATE POLICY "Allow anonymous delete access to customers" ON public.customers FOR DELETE TO anon USING (true);

CREATE POLICY "Allow anonymous read access to order_items" ON public.order_items FOR SELECT TO anon USING (true);
CREATE POLICY "Allow anonymous insert access to order_items" ON public.order_items FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow anonymous update access to order_items" ON public.order_items FOR UPDATE TO anon USING (true);
CREATE POLICY "Allow anonymous delete access to order_items" ON public.order_items FOR DELETE TO anon USING (true);

CREATE POLICY "Allow anonymous read access to orders" ON public.orders FOR SELECT TO anon USING (true);
CREATE POLICY "Allow anonymous insert access to orders" ON public.orders FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow anonymous update access to orders" ON public.orders FOR UPDATE TO anon USING (true);
CREATE POLICY "Allow anonymous delete access to orders" ON public.orders FOR DELETE TO anon USING (true);

CREATE POLICY "Allow anonymous read access to products" ON public.products FOR SELECT TO anon USING (true);
CREATE POLICY "Allow anonymous insert access to products" ON public.products FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow anonymous update access to products" ON public.products FOR UPDATE TO anon USING (true);
CREATE POLICY "Allow anonymous delete access to products" ON public.products FOR DELETE TO anon USING (true);

GRANT ALL ON TABLE public.customers TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.order_items TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.orders TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.products TO anon, authenticated, service_role;

COMMIT;
