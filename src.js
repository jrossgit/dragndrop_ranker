var HTML5 = HTML5 || {};

HTML5.DnD = function() {
    //private members
    var dragSrcEl = null,
        draggables = null,

        init = function(selector) {

            draggables = document.querySelectorAll(selector);

            //Set listeners
            [].forEach.call(draggables, function(elem) {
                elem.addEventListener("dragstart", dragStart, false);
                elem.addEventListener("drag", drag, false);
                elem.addEventListener("dragenter", dragEnter, false);
                elem.addEventListener("dragover", dragOver, false);
                elem.addEventListener("dragleave", dragLeave, false);
                elem.addEventListener("drop", drop, false);
                elem.addEventListener("dragend", dragEnd, false);
            });

        },
        dragStart = function(e) {
            e.dataTransfer.effectAllowed = 'move';
            //e.dataTransfer.setData('text/html', this.innerHTML);
            e.dataTransfer.setData('text', this.innerHTML);
            dragSrcEl = this;
            this.className = this.className.replace("target", "");

        },
        drag = function(e) {
            this.className += ' moving';
        },
        dragOver = function(e) {
            if (e.preventDefault) {
                e.preventDefault();
            }

            e.dataTransfer.dropEffect = 'move';
            this.className += " over";


        },
        dragEnter = function() {
            this.className += " over";
        },
        dragLeave = function() {
            this.className = "";
        },
        drop = function(e) {
            if (e.stopPropagation) {
                e.stopPropagation();
            }

            if (dragSrcEl != this) {
                dragSrcEl.innerHTML = this.innerHTML;
                //this.innerHTML = e.dataTransfer.getData('text/html');
                this.innerHTML = e.dataTransfer.getData('text');
            }

            return false;
        },
        dragEnd = function() {[].forEach.call(draggables, function(elem) {
                elem.className = "";
            });
        };

    return {
        init: init
    }
}();
HTML5.DnD.init('ul li[draggable=true]');