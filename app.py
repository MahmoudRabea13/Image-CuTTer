from flask import Flask , request, render_template 
import function as func
app = Flask( __name__ )

@app.route("/" ,methods=['POST','GET'])
def image():
    if request.method == 'POST':

        func.to_flask()
        return render_template('index.html')
    else:
        return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)























## ---- DUMBS ---- ##
