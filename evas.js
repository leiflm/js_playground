var EVAS_OBJECT_RECTANGLE = 0;
var EVAS_OBJECT_BOX = 1;

var evasses = new Array();

/* functions to create and handle evas */
function _evas_new()
{
	this.evas_objects = new Array();
	this.ts = new Date().getTime();
	this.id = "Evas" + this.ts;

	evasses.push(this);

	return this;
}

function evas_new()
{
	return new _evas_new();
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

function evas_draw_defaults_set(divo, o)
{
	divo.style.position = "absolute";
	//set style according to attribute values
	var geo = evas_object_geometry_get(o);
	divo.style.left = geo.x + "px";
	divo.style.top = geo.y + "px";
	divo.style.width = geo.w + "px";
	divo.style.height = geo.h + "px";
	//console.log("o geometry: %d %d %d %d", geo.x ,geo.y, geo.w, geo.h);		
}

function evas_draw(evas)
{
	console.log("evas with %d elements is drawn", evas_objects_get(evas).length);
	var e = document.createElement('div');
	e.setAttribute('id', evas.id);
	document.body.appendChild(e);
	e.style.width = "100%";
	e.style.height = "100%";
	e.style.position = "absolute";
	e.style.overflow = "hidden";

	for (var i = 0; i < evas_objects_get(evas).length; i++)
	{
		var o = evas_objects_get(evas)[i];

		if (!evas_object_visible_get(o))
			continue;

		//add element to html canvas
		var divo = document.createElement('div');
		divo.setAttribute('id', "o" + i);
		e.appendChild(divo);
		evas_draw_defaults_set(divo, o);
		switch (o.type)
		{
			case EVAS_OBJECT_RECTANGLE:
				evas_draw_evas_object_rectangle(divo, o);
				break;
			default:
				break;
		}
	}
}

function evas_del(evas)
{
	var e = document.getElementById(evas.id);
	var o;

	if (!e) return;

	for (var i = 0; i < e.childNodes.length, o = e.childNodes[i]; i++)
		e.removeChild(o);
	
	evas.evas_objects = null;
}

function evasses_del(evas)
{
	var e

	for (var i = 0; i < evasses.length, e = evasses[i]; i++)
	{
		evas_del(e);
		evasses.pop(e);
	}
}

function evas_draw_evas_object_rectangle(divo, o)
{
	console.log("called for draw rect, color: %s", evas_object_rectangle_color_get(o));
	divo.style.backgroundColor = evas_object_rectangle_color_get(o);
}

/* functions to create evas objects */

function evas_object_add(evas, type)
{
	this.evas = evas;
	this.type = type;
	this.x = 0;
	this.y = 0;
	this.w = 1;
	this.h = 1;
	this.visible = false;

	return this;
}

function evas_object_evas_get(o)
{
	return o.evas;
}

function evas_object_del(o)
{
	evas_object_del(evas_object_evas_get(o), o);
}

function evas_object_visible_get(o)
{
	return o.visible;
}

function evas_object_show(o, v)
{
	o.visible = v;
}

function evas_object_move(o, x, y)
{
	o.x = x;
	o.y = y;
}

function evas_object_resize(o, w, h)
{
	o.w = w;
	o.h = h;
}

function evas_object_geometry_get(o)
{
	return {x : o.x, y : o.y, w : o.w, h : o.h};
}

function evas_object_rectangle_add(evas)
{
	var o = new evas_object_add(evas, EVAS_OBJECT_RECTANGLE);
	o.color = "white";

	evas_object_append(evas, o);

	return o;
}

function evas_object_rectangle_color_set(o, c)
{
	o.color = c;
}

function evas_object_rectangle_color_get(o)
{
	console.log("Rectangle color: %s", o.color);
	return o.color;
}
