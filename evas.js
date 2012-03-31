var EVAS_OBJECT_RECTANGLE = 0;
var EVAS_OBJECT_BOX = 1;

var evasses = new Array();

/* functions to create and handle evas */
function _evas_new(w, h)
{
	this.evas_objects = new Array();
	this.ts = new Date().getTime();
	this.id = "Evas" + this.ts;
	if (!w)
		var w = 0;
	if (!h)
		var h = 0;
	this.w = w;
	this.h = h;

	return this;
}

function evas_new(w, h)
{
	var e = new _evas_new(w, h);
	console.log("Addinng evas %s", evas_id_get(e));
	evasses.push(e);

	return e;
}

function evas_id_get(evas)
{
	return evas.id;
}

function evas_size_get(o)
{
	return {w : o.w, h : o.h};
}

function evas_object_append(evas, evas_object)
{
	console.log("Appending %d to array with for now %d elements", evas_object.type, evas_objects_get(evas).length);
	evas_objects_get(evas).push(evas_object);
}

function evas_object_del(evas, o)
{
	var a = evas_objects_get(evas);
	for (var i = 0; i < a.length; i++)
	{
		if (a[i] == o)
			a.splice(i,1);
	}
}

function evas_objects_get(evas)
{
	return evas.evas_objects;
}

function evas_draw_defaults_set(ctxt, o)
{
	// Nothing do do here yet
}

function evas_draw(evas)
{
	console.log("evas with %d elements is drawn", evas_objects_get(evas).length);
	var e = document.createElement('canvas');
	e.setAttribute('id', evas.id);
	document.body.appendChild(e);
	var es = evas_size_get(evas);
	e.width = es.w;
	e.height = es.h;
	var ctx = e.getContext("2d");

	for (var i = 0; i < evas_objects_get(evas).length; i++)
	{
		var o = evas_objects_get(evas)[i];

		if (!evas_object_visible_get(o))
			continue;
		evas_draw_defaults_set(ctx, o);
		switch (o.type)
		{
			case EVAS_OBJECT_RECTANGLE:
				evas_draw_evas_object_rectangle(ctx, o);
				break;
			default:
				break;
		}
	}
}

function evas_del(evas)
{
	var e = document.getElementById(evas_id_get(evas));

	if (!e) return;

	var p = e.parentNode;
	p.removeChild(e);
}

function evasses_del()
{
	var e;

	for (var i = (evasses.length - 1); i >= 0, e = evasses[i]; i--)
	{
		console.log("deleting evas %s", evas_id_get(e));
		evas_del(e);
		evasses.pop();
	}
}

function evas_draw_evas_object_rectangle(ctx, o)
{
	//set style according to attribute values
	var geo = evas_object_geometry_get(o);
	ctx.fillStyle = evas_object_rectangle_color_get(o);
	ctx.fillRect(geo.x, geo.y, geo.w, geo.h);
	//console.log("o geometry: %d %d %d %d", geo.x ,geo.y, geo.w, geo.h);
}
