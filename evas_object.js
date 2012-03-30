/* functions to create and manipulate evas objects */

function _evas_object_add(evas, type)
{
	this.type = type;
	this.x = 0;
	this.y = 0;
	this.w = 1;
	this.h = 1;
	this.visible = false;

	return this;
}

function evas_object_add(evas, type)
{
	var o = new _evas_object_add(evas, type);
	evas_object_append(evas, o);

	return o;
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
	var o = evas_object_add(evas, EVAS_OBJECT_RECTANGLE);
	o.color = "white";

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
